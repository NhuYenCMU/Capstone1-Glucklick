from transformers import pipeline

# Khởi tạo pipeline với mô hình đã fine-tune để sinh câu hỏi
question_generator = pipeline(
    "text2text-generation", model="valhalla/t5-small-qa-qg-hl"
)

# Đoạn văn bản đầu vào
input_text = """
Học máy (Machine Learning) là một lĩnh vực con của trí tuệ nhân tạo (AI) liên quan đến việc xây dựng các hệ thống 
có thể học và cải thiện từ dữ liệu mà không cần lập trình cụ thể.
"""

# Chuẩn bị đầu vào cho mô hình (bổ sung cấu trúc "generate questions: " để mô hình nhận biết)
formatted_input = f"generate questions: {input_text}"

# Sinh câu hỏi
questions = question_generator(formatted_input, max_length=64, num_return_sequences=5)

# Hiển thị các câu hỏi được sinh ra
print("Câu hỏi được sinh ra:")
for i, q in enumerate(questions, 1):
    print(f"{i}. {q['generated_text']}")
