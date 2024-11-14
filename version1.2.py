from datasets import load_dataset
from transformers import T5Tokenizer, TFT5ForConditionalGeneration
import tensorflow as tf

# Tải dữ liệu và chọn bộ dữ liệu SQuAD
dataset = load_dataset("squad")
train_data = dataset["train"]
test_data = dataset["validation"]

# Khởi tạo tokenizer và mô hình T5
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = TFT5ForConditionalGeneration.from_pretrained("t5-small")


# Hàm tiền xử lý dữ liệu với câu hỏi và câu trả lời đúng
def preprocess_function(examples):
    inputs = [
        "generate question and answer: " + context for context in examples["context"]
    ]
    targets = [
        f"Q: {question} A: {examples['answers']['text'][0]}"
        for question in examples["question"]
    ]
    return {"input_text": inputs, "target_text": targets}


# Tiền xử lý dữ liệu huấn luyện và kiểm tra
train_data = train_data.map(preprocess_function, batched=True)
test_data = test_data.map(preprocess_function, batched=True)


# Tokenize dữ liệu
def tokenize_function(examples):
    model_inputs = tokenizer(
        examples["input_text"], max_length=512, truncation=True, padding="max_length"
    )
    with tokenizer.as_target_tokenizer():
        labels = tokenizer(
            examples["target_text"],
            max_length=128,
            truncation=True,
            padding="max_length",
        )
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs


# Áp dụng token hóa cho dữ liệu huấn luyện và kiểm tra
tokenized_train_data = train_data.map(tokenize_function, batched=True)
tokenized_test_data = test_data.map(tokenize_function, batched=True)

# Chuyển dữ liệu thành TensorFlow Dataset
train_dataset = tokenized_train_data.to_tf_dataset(
    columns=["input_ids", "attention_mask"],
    label_cols=["labels"],
    shuffle=True,
    batch_size=8,
)
test_dataset = tokenized_test_data.to_tf_dataset(
    columns=["input_ids", "attention_mask"],
    label_cols=["labels"],
    shuffle=False,
    batch_size=8,
)

# Thiết lập tham số và huấn luyện mô hình
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=2e-5), loss=model.compute_loss
)
model.fit(train_dataset, validation_data=test_dataset, epochs=3)

# Lưu mô hình sau khi huấn luyện
model.save_pretrained("saved_model_t5_qa_generator")
tokenizer.save_pretrained("saved_model_t5_qa_generator")

# Tải lại mô hình đã lưu
tokenizer = T5Tokenizer.from_pretrained("saved_model_t5_qa_generator")
model = TFT5ForConditionalGeneration.from_pretrained("saved_model_t5_qa_generator")


# Hàm tạo nhiều câu hỏi và đáp án từ đoạn văn bản
def generate_multiple_qa(context, num_qa=5):
    qa_pairs = []
    for i in range(num_qa):
        input_text = f"generate question and answer {i+1}: " + context
        input_ids = tokenizer(input_text, return_tensors="tf").input_ids
        outputs = model.generate(input_ids)
        qa_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Tách câu hỏi và đáp án
        if "Q:" in qa_text and "A:" in qa_text:
            question = qa_text.split("Q:")[1].split("A:")[0].strip()
            answer = qa_text.split("A:")[1].strip()
            qa_pairs.append({"question": question, "answer": answer})
    return qa_pairs


# Kiểm thử hàm với một đoạn văn bản
context = "GPT-3 is a state-of-the-art language model developed by OpenAI."
qa_pairs = generate_multiple_qa(context, num_qa=5)
print("Các cặp câu hỏi và đáp án sinh ra:", qa_pairs)
