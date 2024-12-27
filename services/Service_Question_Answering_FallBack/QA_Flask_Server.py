from flask import Flask, request, jsonify
from haystack import Document
from haystack.components.readers import ExtractiveReader
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Tải biến môi trường từ file .env
load_dotenv()

app = Flask(__name__)

# Khởi tạo reader toàn cục
reader = ExtractiveReader(model="deepset/tinyroberta-squad2")
reader.warm_up()

# Cấu hình Generative AI
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError(
        "GOOGLE_API_KEY không được định nghĩa. Vui lòng kiểm tra file .env."
    )

genai.configure(api_key=GOOGLE_API_KEY)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

try:
    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash-exp",
        generation_config=generation_config,
    )
except Exception as e:
    raise RuntimeError(f"Không thể khởi tạo mô hình Generative AI: {e}")


def get_real_answer(text, question):
    """Lấy câu trả lời từ mô hình Generative AI."""
    prompt = (
        f"Please carefully read the following paragraph and answer the question based on the context:\n\n"
        f"Paragraph: {text}\n\n"
        f"Question: {question}\n\n"
        f"Your answer should be clear, concise, and based only on the given paragraph. "
        f"If the paragraph does not contain enough information, explicitly state that."
    )
    try:
        chat_session = model.start_chat(history=[])
        response = chat_session.send_message(prompt)
        return response.text.strip()
    except Exception as e:
        app.logger.error(f"Error in getRealAnswer: {e}")
        return "Unable to generate an answer."


@app.route("/ask_question", methods=["POST"])
def ask_question():
    try:
        # Nhận dữ liệu từ request
        data = request.json
        text = data.get("text", "")
        question = data.get("question", "")

        if not text or not question:
            return jsonify({"error": "Please provide both text and question."}), 400

        # Haystack Reader
        docs = [Document(content=text)]
        result = reader.run(query=question, documents=docs)
        haystack_answers = [
            {"answer": answer.data, "score": answer.score}
            for answer in result["answers"]
            if answer.score >= 0.5
        ]

        # Generative AI Answer
        real_answer = get_real_answer(text, question)

        # Trả về kết quả
        return jsonify(
            {
                "question": question,
                "haystack_answers": haystack_answers,
                "real_answer": real_answer,
            }
        )

    except Exception as e:
        app.logger.error(f"Exception on /ask_question: {e}")
        return (
            jsonify({"error": "An error occurred while processing your request."}),
            500,
        )


if __name__ == "__main__":
    app.run(debug=False, port=4004)
