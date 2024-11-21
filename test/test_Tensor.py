from transformers import (
    TFAutoModelForMultipleChoice,
    AutoTokenizer,
    create_optimizer,
)
from datasets import Dataset, DatasetDict
from sklearn.model_selection import train_test_split
import tensorflow as tf

# Định nghĩa dữ liệu
data = {
    "paragraph": [
        "Hugging Face là một công ty AI chuyên cung cấp công cụ mã nguồn mở cho xử lý ngôn ngữ tự nhiên.",
        "Python là ngôn ngữ lập trình phổ biến cho học máy và xử lý dữ liệu.",
    ],
    "question": [
        "Hugging Face chuyên cung cấp gì?",
        "Python là ngôn ngữ phổ biến cho lĩnh vực nào?",
    ],
    "options": [
        ["Công cụ AI", "Thiết bị phần cứng", "Phần mềm chỉnh sửa ảnh", "Game console"],
        [
            "Lập trình web",
            "Phân tích tài chính",
            "Học máy và xử lý dữ liệu",
            "Thiết kế đồ họa",
        ],
    ],
    "answer": [0, 2],
}


# Tiền xử lý dữ liệu thành Dataset của Hugging Face
def preprocess_data(data):
    examples = []
    for i in range(len(data["paragraph"])):
        examples.append(
            {
                "sent1": data["paragraph"][i],
                "sent2": data["question"][i],
                "ending0": data["options"][i][0],
                "ending1": data["options"][i][1],
                "ending2": data["options"][i][2],
                "ending3": data["options"][i][3],
                "label": data["answer"][i],
            }
        )
    return Dataset.from_list(examples)


dataset = preprocess_data(data)

# Chia dữ liệu train và validation
train_data, val_data = train_test_split(
    dataset.to_pandas(), test_size=0.2, random_state=42
)
train_dataset = Dataset.from_pandas(train_data)
val_dataset = Dataset.from_pandas(val_data)
dataset = DatasetDict({"train": train_dataset, "validation": val_dataset})

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
ending_names = ["ending0", "ending1", "ending2", "ending3"]


# Hàm tiền xử lý
def preprocess_function(examples):
    first_sentences = [[context] * 4 for context in examples["sent1"]]
    second_sentences = [
        [examples["sent2"][i] + " " + examples[end][i] for end in ending_names]
        for i in range(len(examples["sent1"]))
    ]
    first_sentences = sum(first_sentences, [])
    second_sentences = sum(second_sentences, [])
    tokenized_examples = tokenizer(
        first_sentences, second_sentences, truncation=True, padding=True
    )
    return {
        k: [v[i : i + 4] for i in range(0, len(v), 4)]
        for k, v in tokenized_examples.items()
    }


tokenized_dataset = dataset.map(preprocess_function, batched=True)


# Chuyển đổi sang định dạng tf.data.Dataset
def convert_to_tf_dataset(dataset):
    return tf.data.Dataset.from_generator(
        lambda: (
            {
                key: tf.constant(value)
                for key, value in dataset.items()
                if key != "labels"
            },
            tf.constant(dataset["labels"]),
        ),
        output_signature=(
            {
                key: tf.TensorSpec(shape=(None, None), dtype=tf.int32)
                for key in dataset
                if key != "labels"
            },
            tf.TensorSpec(shape=(None,), dtype=tf.int32),
        ),
    )


tf_train_dataset = convert_to_tf_dataset(tokenized_dataset["train"]).batch(8)
tf_val_dataset = convert_to_tf_dataset(tokenized_dataset["validation"]).batch(8)

# Load model
model = TFAutoModelForMultipleChoice.from_pretrained("bert-base-uncased")

# Tạo optimizer
batch_size = 8
epochs = 3
num_train_steps = len(tokenized_dataset["train"]) // batch_size * epochs
optimizer, schedule = create_optimizer(
    init_lr=2e-5, num_warmup_steps=0, num_train_steps=num_train_steps
)

# Compile model
loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
model.compile(optimizer=optimizer, loss=loss, metrics=["accuracy"])

# Huấn luyện mô hình
model.fit(tf_train_dataset, validation_data=tf_val_dataset, epochs=epochs)

# Lưu mô hình
model.save_pretrained("./multiple_choice_model.keras")
tokenizer.save_pretrained("./multiple_choice_model.keras")