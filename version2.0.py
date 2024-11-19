# from datasets import load_dataset
# from transformers import T5Tokenizer, TFT5ForConditionalGeneration
# import tensorflow as tf

# # Tải dữ liệu và chọn bộ dữ liệu SQuAD
# dataset = load_dataset("squad")
# train_data = dataset["train"]
# test_data = dataset["validation"]

# # Khởi tạo tokenizer và mô hình T5
# tokenizer = T5Tokenizer.from_pretrained("t5-small")
# model = TFT5ForConditionalGeneration.from_pretrained("t5-small")


# # Hàm tiền xử lý dữ liệu với câu hỏi và câu trả lời đúng
# def preprocess_function(examples):
#     inputs = [
#         "generate question and answer: " + context for context in examples["context"]
#     ]
#     targets = [
#         (
#             f"Q: {question} A: {answer['text'][0]}"
#             if answer["text"]
#             else "Q: {question} A: "
#         )
#         for question, answer in zip(examples["question"], examples["answers"])
#     ]
#     return {"input_text": inputs, "target_text": targets}


# # Tiền xử lý dữ liệu huấn luyện và kiểm tra
# train_data = train_data.map(preprocess_function, batched=True)
# test_data = test_data.map(preprocess_function, batched=True)


# # Hàm token hóa
# def tokenize_function(examples):
#     model_inputs = tokenizer(
#         examples["input_text"], max_length=512, truncation=True, padding="max_length"
#     )
#     with tokenizer.as_target_tokenizer():
#         labels = tokenizer(
#             examples["target_text"],
#             max_length=128,
#             truncation=True,
#             padding="max_length",
#         )
#     model_inputs["labels"] = labels["input_ids"]
#     return model_inputs


# # Token hóa dữ liệu
# tokenized_train_data = train_data.map(tokenize_function, batched=True)
# tokenized_test_data = test_data.map(tokenize_function, batched=True)


# # Chuyển dữ liệu thành TensorFlow Dataset
# def to_tf_dataset(tokenized_data, batch_size=8):
#     def gen():
#         for example in tokenized_data:
#             yield {key: tf.convert_to_tensor(value) for key, value in example.items()}

#     return tf.data.Dataset.from_generator(
#         gen,
#         output_signature={
#             "input_ids": tf.TensorSpec(shape=(512,), dtype=tf.int32),
#             "attention_mask": tf.TensorSpec(shape=(512,), dtype=tf.int32),
#             "labels": tf.TensorSpec(shape=(128,), dtype=tf.int32),
#         },
#     ).batch(batch_size)


# # Tạo TensorFlow Dataset
# train_dataset = to_tf_dataset(tokenized_train_data)
# test_dataset = to_tf_dataset(tokenized_test_data)

# # Khởi tạo optimizer
# optimizer = tf.keras.optimizers.Adam(learning_rate=2e-5)

# # Vòng lặp huấn luyện thủ công
# epochs = 3
# for epoch in range(epochs):
#     print(f"Epoch {epoch+1}/{epochs}")
#     for batch in train_dataset:
#         with tf.GradientTape() as tape:
#             # Tính toán loss
#             outputs = model(
#                 input_ids=batch["input_ids"],
#                 attention_mask=batch["attention_mask"],
#                 labels=batch["labels"],
#             )
#             loss = outputs.loss
#         gradients = tape.gradient(loss, model.trainable_variables)
#         optimizer.apply_gradients(zip(gradients, model.trainable_variables))
#         print(f"Loss: {loss.numpy()}")

# # Lưu mô hình sau khi huấn luyện
# model.save_pretrained("saved_model_t5_qa_generator")
# tokenizer.save_pretrained("saved_model_t5_qa_generator")
from datasets import load_dataset
from transformers import T5Tokenizer, TFT5ForConditionalGeneration
import tensorflow as tf

# Tải dữ liệu và chọn bộ dữ liệu SQuAD
dataset = load_dataset("squad")
train_data = dataset["train"]
test_data = dataset["validation"]

# Khởi tạo tokenizer và mô hình T5
tokenizer = T5Tokenizer.from_pretrained("t5-small", legacy=False)
model = TFT5ForConditionalGeneration.from_pretrained("t5-small")


# Hàm tiền xử lý dữ liệu với câu hỏi và câu trả lời đúng
def preprocess_function(examples):
    inputs = [
        "generate question and answer: " + context for context in examples["context"]
    ]
    # Trích xuất phần văn bản câu trả lời thay vì giữ nguyên cấu trúc dict
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


# Chuyển dữ liệu thành TensorFlow Dataset
def to_tf_dataset(tokenized_data, batch_size=8):
    def gen():
        for example in tokenized_data:
            # Chỉ chuyển đổi các trường văn bản đã được tiền xử lý
            yield {
                "input_ids": tf.convert_to_tensor(example["input_ids"]),
                "attention_mask": tf.convert_to_tensor(example["attention_mask"]),
                "labels": tf.convert_to_tensor(example["labels"]),
            }

    return tf.data.Dataset.from_generator(
        gen,
        output_signature={
            "input_ids": tf.TensorSpec(shape=(512,), dtype=tf.int32),
            "attention_mask": tf.TensorSpec(shape=(512,), dtype=tf.int32),
            "labels": tf.TensorSpec(shape=(128,), dtype=tf.int32),
        },
    ).batch(batch_size)


# Tạo TensorFlow Dataset
train_dataset = to_tf_dataset(tokenized_train_data)
test_dataset = to_tf_dataset(tokenized_test_data)

# Khởi tạo optimizer
optimizer = tf.keras.optimizers.Adam(learning_rate=2e-5)

# Vòng lặp huấn luyện thủ công
epochs = 3
for epoch in range(epochs):
    print(f"Epoch {epoch+1}/{epochs}")
    for batch in train_dataset:
        with tf.GradientTape() as tape:
            # Tính toán loss
            outputs = model(
                input_ids=batch["input_ids"],
                attention_mask=batch["attention_mask"],
                labels=batch["labels"],
            )
            loss = outputs.loss
        gradients = tape.gradient(loss, model.trainable_variables)
        optimizer.apply_gradients(zip(gradients, model.trainable_variables))
        print(f"Loss: {loss.numpy()}")

# Lưu mô hình sau khi huấn luyện
model.save_pretrained("saved_model_t5_qa_generator.keras")
tokenizer.save_pretrained("saved_model_t5_qa_generator.keras")
