from transformers import (
    TFAutoModelForMultipleChoice,
    AutoTokenizer,
    create_optimizer,
)
from datasets import load_dataset
import tensorflow as tf

# Load dataset SWAG từ Hugging Face
dataset = load_dataset("swag", "regular")

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained("google-bert/bert-base-uncased")

# Tiền xử lý dữ liệu
ending_names = ["ending0", "ending1", "ending2", "ending3"]


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


# Áp dụng tiền xử lý lên dataset
tokenized_dataset = dataset.map(preprocess_function, batched=True)


# Chuyển đổi sang tf.data.Dataset
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
model.save_pretrained("./swag_multiple_choice_model")
tokenizer.save_pretrained("./swag_multiple_choice_model")
