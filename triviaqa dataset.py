import tensorflow as tf
from transformers import TFAutoModelForSeq2SeqLM, AutoTokenizer
from datasets import load_dataset
# Load TriviaQA dataset
dataset = load_dataset("trivia_qa", "unfiltered")
train_data = dataset["train"]
validation_data = dataset["validation"]
# Load T5 model and tokenizer for sequence-to-sequence tasks
model_name = "t5-small"  # Bạn có thể thử với các model lớn hơn như t5-base, t5-large
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = TFAutoModelForSeq2SeqLM.from_pretrained(model_name)
# Function to preprocess the data for question generation
def preprocess_data(example):
    context = example["search_results"]["passage"][0]
    answer = example["answer"]["aliases"][0]
    input_text = f"generate question: context: {context} answer: {answer}"
    return tokenizer(
        input_text,
        max_length=512,
        truncation=True,
        padding="max_length",
        return_tensors="tf",
    )


train_data = train_data.map(preprocess_data, batched=True)
validation_data = validation_data.map(preprocess_data, batched=True)
# Prepare TensorFlow datasets
train_dataset = tf.data.Dataset.from_tensor_slices(
    (
        dict(
            input_ids=train_data["input_ids"],
            attention_mask=train_data["attention_mask"],
        ),
        train_data["labels"],
    )
).batch(8)

validation_dataset = tf.data.Dataset.from_tensor_slices(
    (
        dict(
            input_ids=validation_data["input_ids"],
            attention_mask=validation_data["attention_mask"],
        ),
        validation_data["labels"],
    )
).batch(8)
# Compile the model
optimizer = tf.keras.optimizers.Adam(learning_rate=5e-5)
model.compile(optimizer=optimizer, loss=model.compute_loss)


# Train the model
model.fit(train_dataset, validation_data=validation_dataset, epochs=3)
def generate_question(context, answer):
    input_text = f"generate question: context: {context} answer: {answer}"
    inputs = tokenizer(input_text, return_tensors="tf", max_length=512, truncation=True)
    outputs = model.generate(
        inputs["input_ids"], max_length=50, num_beams=4, early_stopping=True
    )
    question = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return question


# Ví dụ sử dụng
context = "TensorFlow là một thư viện mã nguồn mở để học sâu."
answer = "TensorFlow"
question = generate_question(context, answer)
print("Generated Question:", question)
