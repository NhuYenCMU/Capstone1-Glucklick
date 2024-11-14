import random
from transformers import T5Tokenizer, TFT5ForConditionalGeneration
import tensorflow as tf

# Load pretrained model and tokenizer
try:
    tokenizer = T5Tokenizer.from_pretrained("t5-small")
    model = TFT5ForConditionalGeneration.from_pretrained("t5-small")
except Exception as e:
    print("Error loading model or tokenizer:", e)
    model, tokenizer = None, None


# Hàm sinh câu hỏi, đáp án đúng và đáp án nhiễu
def generate_question_with_choices(
    context, num_distractors=3, max_length=50, temperature=1.0
):
    # Kiểm tra nếu mô hình chưa được tải
    if not model or not tokenizer:
        print("Model or tokenizer not loaded. Please check initialization.")
        return None

    try:
        # Sinh câu hỏi và đáp án đúng
        input_text = f"Generate a question (Q:) and an answer (A:) based on the following context: {context}"
        input_ids = tokenizer(input_text, return_tensors="tf").input_ids
        outputs = model.generate(
            input_ids,
            max_length=max_length,
            temperature=temperature,
            num_return_sequences=1,
            do_sample=True,  # Bổ sung do_sample=True
        )
        qa_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print("Generated text:", qa_text)  # In đầu ra để kiểm tra định dạng

        # Tách câu hỏi và đáp án
        if "Q:" in qa_text and "A:" in qa_text:
            question = qa_text.split("Q:")[1].split("A:")[0].strip()
            correct_answer = qa_text.split("A:")[1].strip()
        else:
            print("Failed to parse question and answer from model output.")
            return None

        # Kiểm tra tính hợp lệ của câu hỏi và đáp án
        if not question or not correct_answer:
            print("Generated question or answer is empty.")
            return None

        # Sinh đáp án nhiễu
        distractors = []
        for _ in range(num_distractors):
            distractor_text = f"Generate an incorrect answer for: {context}"
            input_ids = tokenizer(distractor_text, return_tensors="tf").input_ids
            outputs = model.generate(
                input_ids,
                max_length=max_length,
                temperature=temperature,
                num_return_sequences=1,
                do_sample=True,  # Bổ sung do_sample=True cho đáp án nhiễu
            )
            distractor_answer = tokenizer.decode(
                outputs[0], skip_special_tokens=True
            ).strip()

            # Kiểm tra tính hợp lệ của đáp án nhiễu và tránh trùng lặp
            if (
                distractor_answer
                and distractor_answer != correct_answer
                and distractor_answer not in distractors
            ):
                distractors.append(distractor_answer)

        # Kiểm tra số lượng đáp án nhiễu
        if len(distractors) < num_distractors:
            print("Generated fewer distractors than requested.")
            return None

        # Gom đáp án đúng và đáp án nhiễu rồi xáo trộn
        all_answers = distractors + [correct_answer]
        random.shuffle(all_answers)

        # Tìm chỉ mục của đáp án đúng
        correct_index = all_answers.index(correct_answer)

        # Trả về câu hỏi, các đáp án và chỉ mục của đáp án đúng
        return {
            "question": question,
            "choices": all_answers,
            "correct_index": correct_index,
        }

    except tf.errors.InvalidArgumentError as e:
        print("TensorFlow error:", e)
        return None
    except Exception as e:
        print("An error occurred:", e)
        return None


# Kiểm thử với một đoạn văn bản
context = "GPT-3 is a state-of-the-art language model developed by OpenAI."
qa_output = generate_question_with_choices(
    context, num_distractors=3, max_length=50, temperature=0.7
)

if qa_output:
    print("Question:", qa_output["question"])
    print("Choices:", qa_output["choices"])
    print("Correct Answer Index:", qa_output["correct_index"])
else:
    print("Failed to generate question and answers.")
