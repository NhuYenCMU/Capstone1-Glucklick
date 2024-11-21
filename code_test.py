from transformers import T5ForConditionalGeneration, T5Tokenizer

### pytorch
def generate_questions_from_text(
    text, model_name="t5-small", max_length=512, num_questions=5
):
    # Tải mô hình và tokenizer
    model = T5ForConditionalGeneration.from_pretrained(model_name)
    tokenizer = T5Tokenizer.from_pretrained(model_name)

    # Tiền xử lý văn bản đầu vào
    input_text = f"generate question: {text} </s>"
    inputs = tokenizer.encode(
        input_text, return_tensors="pt", max_length=max_length, truncation=True
    )

    # Sinh câu hỏi
    outputs = model.generate(
        inputs,
        max_length=64,
        num_beams=5,
        num_return_sequences=num_questions,
        early_stopping=True,
    )

    # Chuyển đổi token thành câu
    questions = [
        tokenizer.decode(output, skip_special_tokens=True) for output in outputs
    ]
    return questions


# Văn bản mẫu
input_text = """
Học máy (Machine Learning) là một lĩnh vực con của trí tuệ nhân tạo (AI) liên quan đến việc xây dựng các hệ thống 
có thể học và cải thiện từ dữ liệu mà không cần lập trình cụ thể. Các thuật toán học máy thường được sử dụng trong 
nhận dạng hình ảnh, xử lý ngôn ngữ tự nhiên, và phân tích dữ liệu.
"""

# Sinh câu hỏi
questions = generate_questions_from_text(input_text)
print("Câu hỏi được sinh ra:")
for i, q in enumerate(questions, 1):
    print(f"{i}. {q}")
