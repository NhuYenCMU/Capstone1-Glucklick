from flask import Flask, request, jsonify
from transformers import T5Tokenizer, T5ForConditionalGeneration

app = Flask(__name__)

# Load T5 model và tokenizer
model_name = "TranVanTri352/MCQ_Paragraph_AI_Model"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)


@app.route("/generate", methods=["POST"])
def generate_text():
    try:
        data = request.json
        if not data or "text" not in data:
            return jsonify({"error": 'Invalid input, "text" is required'}), 400

        input_text = data["text"]
        inputs = tokenizer.encode(
            input_text, return_tensors="pt", truncation=True, max_length=512
        )
        outputs = model.generate(
            input_ids=inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            max_length=128,
            num_beams=5,
            temperature=0.7,
            top_k=50,
            repetition_penalty=1.2,
        )
        output_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        return jsonify({"generated_text": output_text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "Service is healthy"}), 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)
