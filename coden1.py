from transformers import TFT5ForConditionalGeneration, T5Tokenizer


def generate_questions_from_text(
    text, model_name="t5-base", max_length=512, num_questions=5
):
    # Tải mô hình và tokenizer
    model = TFT5ForConditionalGeneration.from_pretrained(model_name)
    tokenizer = T5Tokenizer.from_pretrained(model_name)

    # Tiền xử lý văn bản đầu vào
    task_prefix = "generate questions: "
    input_text = f"{task_prefix} {text.strip()}"
    inputs = tokenizer.encode(
        input_text, return_tensors="tf", max_length=max_length, truncation=True
    )

    # Sinh câu hỏi
    outputs = model.generate(
        inputs,
        max_length=64,
        num_beams=10,
        num_return_sequences=num_questions,
        repetition_penalty=1.2,
        early_stopping=True,
    )

    # Chuyển đổi token thành câu
    questions = [
        tokenizer.decode(output, skip_special_tokens=True) for output in outputs
    ]
    return questions


# Văn bản mẫu
text_1 = (
    "Automobili Lamborghini, the illustrious Italian manufacturer of luxury sports cars, "
    "is headquartered in Sant'Agata Bolognese. Ferruccio Lamborghini founded this iconic brand in 1963, "
    "aiming to challenge Ferrari. Over the decades, Lamborghini has introduced models like the Aventador and Huracán, "
    "and has also ventured into hybrid technology with the Revuelto in 2024."
)

# Gọi hàm sinh câu hỏi
questions = generate_questions_from_text(text_1)
print("Câu hỏi được sinh ra:")
for i, q in enumerate(questions, 1):
    print(f"{i}. {q}")
