from transformers import (
    AutoModelForMultipleChoice,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
)
from datasets import Dataset, DatasetDict
from sklearn.model_selection import train_test_split
import evaluate
import torch
from dataclasses import dataclass
from typing import Optional, Union
from transformers.tokenization_utils_base import (
    PreTrainedTokenizerBase,
    PaddingStrategy,
)

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


# Preprocess dataset
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

# Split data
train_data, val_data = train_test_split(
    dataset.to_pandas(), test_size=0.2, random_state=42
)
train_dataset = Dataset.from_pandas(train_data)
val_dataset = Dataset.from_pandas(val_data)
dataset = DatasetDict({"train": train_dataset, "validation": val_dataset})

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
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


tokenized_dataset = dataset.map(preprocess_function, batched=True)


# Tạo Data Collator cho multiple choice
@dataclass
class DataCollatorForMultipleChoice:
    tokenizer: PreTrainedTokenizerBase
    padding: Union[bool, str, PaddingStrategy] = True
    max_length: Optional[int] = None
    pad_to_multiple_of: Optional[int] = None

    def __call__(self, features):
        label_name = "label" if "label" in features[0] else "labels"
        labels = [feature.pop(label_name) for feature in features]
        batch_size = len(features)
        num_choices = len(features[0]["input_ids"])
        flattened_features = [
            {k: v[i] for k, v in feature.items()}
            for feature in features
            for i in range(num_choices)
        ]
        batch = self.tokenizer.pad(
            flattened_features,
            padding=self.padding,
            max_length=self.max_length,
            pad_to_multiple_of=self.pad_to_multiple_of,
            return_tensors="pt",
        )
        batch = {k: v.view(batch_size, num_choices, -1) for k, v in batch.items()}
        batch["labels"] = torch.tensor(labels, dtype=torch.int64)
        return batch


data_collator = DataCollatorForMultipleChoice(tokenizer)

# Định nghĩa hàm tính độ chính xác
accuracy = evaluate.load("accuracy")


def compute_metrics(eval_pred):
    predictions, labels = eval_pred
    predictions = predictions.argmax(axis=-1)
    return accuracy.compute(predictions=predictions, references=labels)


# Load model
model = AutoModelForMultipleChoice.from_pretrained("bert-base-uncased")

# Huấn luyện
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
    save_strategy="epoch",
    logging_dir="./logs",
    logging_steps=10,
    load_best_model_at_end=True,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["validation"],
    tokenizer=tokenizer,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
)

trainer.train()
trainer.save_model("./multiple_choice_model")
