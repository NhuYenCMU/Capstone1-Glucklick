from datasets import load_dataset
from transformers import (
    T5Tokenizer,
    TFT5ForConditionalGeneration,
    Trainer,
    TrainingArguments,
    DataCollatorForSeq2Seq,
)
import tensorflow as tf
from tensorflow.keras import mixed_precision
import datetime

# Kiểm tra nếu có GPU và sử dụng nếu có
if tf.config.list_physical_devices("GPU"):
    print("Using GPU for training")
else:
    print("No GPU found, using CPU")

# Thiết lập mixed precision để tăng tốc độ huấn luyện và tiết kiệm bộ nhớ
mixed_precision.set_global_policy("mixed_float16")

# Tải dữ liệu và chọn bộ dữ liệu SQuAD
dataset = load_dataset("squad")
train_data = dataset["train"]
test_data = dataset["validation"]

# Khởi tạo tokenizer và mô hình T5
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = TFT5ForConditionalGeneration.from_pretrained("t5-small")

# Thiết lập prefix
PREFIX = "generate question and answer: "


# Hàm tiền xử lý dữ liệu với câu hỏi và câu trả lời đúng
def preprocess_function(examples):
    inputs = [PREFIX + context for context in examples["context"]]
    targets = [
        (
            f"Q: {question} A: {answer['text'][0]}"
            if answer["text"]
            else f"Q: {question} A: "
        )
        for question, answer in zip(examples["question"], examples["answers"])
    ]
    return {"input_text": inputs, "target_text": targets}


# Tiền xử lý dữ liệu huấn luyện và kiểm tra
train_data = train_data.map(preprocess_function, batched=True)
test_data = test_data.map(preprocess_function, batched=True)


# Hàm token hóa
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


# Token hóa dữ liệu
tokenized_train_data = train_data.map(tokenize_function, batched=True)
tokenized_test_data = test_data.map(tokenize_function, batched=True)

# Tạo data collator cho seq2seq với padding động
data_collator = DataCollatorForSeq2Seq(tokenizer=tokenizer, model=model)

# Thiết lập TensorBoard để theo dõi quá trình huấn luyện
log_dir = "logs/fit/" + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir, histogram_freq=1)

# Thiết lập các tham số huấn luyện
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
    logging_dir=log_dir,
)

# Khởi tạo Trainer của Hugging Face
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_train_data,
    eval_dataset=tokenized_test_data,
    tokenizer=tokenizer,
    data_collator=data_collator,
)

# Huấn luyện mô hình
trainer.train()

# Lưu mô hình và tokenizer sau khi huấn luyện
model.save_pretrained("saved_model_t5_qa_generator")
tokenizer.save_pretrained("saved_model_t5_qa_generator")
