from transformers import (
    TFAutoModelForMultipleChoice,
    AutoTokenizer,
    create_optimizer,
)
from datasets import load_dataset
import tensorflow as tf
import random

# Load dataset SQuAD từ Hugging Face
dataset = load_dataset("squad")

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")


# Hàm để tạo distractors
def create_distractors(answer, context, num_distractors=3):
    words = context.split()
    distractors = []
    while len(distractors) < num_distractors:
        sampled = " ".join(random.sample(words, min(len(words), random.randint(2, 5))))
        if sampled not in distractors and sampled != answer:
            distractors.append(sampled)
    return distractors


# Tiền xử lý dữ liệu SQuAD thành multiple choice
def preprocess_squad_to_mc(examples):
    processed_examples = {
        "sent1": [],
        "sent2": [],
        "ending0": [],
        "ending1": [],
        "ending2": [],
        "ending3": [],
        "labels": [],
    }
    for context, question, answer in zip(
        examples["context"], examples["question"], examples["answers"]
    ):
        if not answer["text"]:
            continue
        correct_answer = answer["text"][0]
        distractors = create_distractors(correct_answer, context)
        if len(distractors) < 3:
            continue
        processed_examples["sent1"].append(context)
        processed_examples["sent2"].append(question)
        processed_examples["ending0"].append(correct_answer)
        processed_examples["ending1"].append(distractors[0])
        processed_examples["ending2"].append(distractors[1])
        processed_examples["ending3"].append(distractors[2])
        processed_examples["labels"].append(0)
    return processed_examples


# Áp dụng tiền xử lý
train_dataset = preprocess_squad_to_mc(dataset["train"])
val_dataset = preprocess_squad_to_mc(dataset["validation"])


# Chuyển đổi sang tf.data.Dataset
def convert_to_tf_dataset(data):
    return tf.data.Dataset.from_tensor_slices(
        (
            {
                "input_ids": tf.constant(data["input_ids"]),
                "attention_mask": tf.constant(data["attention_mask"]),
                "token_type_ids": tf.constant(data["token_type_ids"]),
            },
            tf.constant(data["labels"]),
        )
    ).batch(8)


tf_train_dataset = convert_to_tf_dataset(
    tokenizer(
        train_dataset["sent1"], train_dataset["sent2"], truncation=True, padding=True
    )
)
tf_val_dataset = convert_to_tf_dataset(
    tokenizer(val_dataset["sent1"], val_dataset["sent2"], truncation=True, padding=True)
)

# Load model
model = TFAutoModelForMultipleChoice.from_pretrained("bert-base-uncased")

# Tạo optimizer
batch_size = 8
epochs = 3
num_train_steps = len(tf_train_dataset) * epochs
optimizer, schedule = create_optimizer(
    init_lr=2e-5, num_warmup_steps=0, num_train_steps=num_train_steps
)

# Compile model
loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
model.compile(optimizer=optimizer, loss=loss, metrics=["accuracy"])

# Huấn luyện
model.fit(tf_train_dataset, validation_data=tf_val_dataset, epochs=epochs)

# Lưu mô hình
model.save_pretrained("./squad_multiple_choice_model")
tokenizer.save_pretrained("./squad_multiple_choice_model")
