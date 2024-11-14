
from transformers import T5Tokenizer, TFT5ForConditionalGeneration
import tensorflow as tf


class QuestionGenerator:
    def __init__(self):
        self.tokenizer = T5Tokenizer.from_pretrained("t5-small")
        self.model = TFT5ForConditionalGeneration.from_pretrained("t5-small")

    def generate_question_with_choices(
        self, context, num_distractors=3, max_length=50, temperature=1.0
    ):
        input_text = f"generate question and answer: {context}"
        input_ids = self.tokenizer(input_text, return_tensors="tf").input_ids
        outputs = self.model.generate(
            input_ids,
            max_length=max_length,
            temperature=temperature,
            num_return_sequences=1,
        )
        qa_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

        if "Q:" in qa_text and "A:" in qa_text:
            question = qa_text.split("Q:")[1].split("A:")[0].strip()
            correct_answer = qa_text.split("A:")[1].strip()
        else:
            return None

        distractors = []
        for _ in range(num_distractors):
            distractor_text = f"generate incorrect answer for: {context}"
            input_ids = self.tokenizer(distractor_text, return_tensors="tf").input_ids
            outputs = self.model.generate(
                input_ids,
                max_length=max_length,
                temperature=temperature,
                num_return_sequences=1,
            )
            distractor_answer = self.tokenizer.decode(
                outputs[0], skip_special_tokens=True
            ).strip()
            if (
                distractor_answer
                and distractor_answer != correct_answer
                and distractor_answer not in distractors
            ):
                distractors.append(distractor_answer)

        all_answers = distractors + [correct_answer]
        random.shuffle(all_answers)
        correct_index = all_answers.index(correct_answer)

        return {
            "question": question,
            "choices": all_answers,
            "correct_index": correct_index,
        }


question_generator = QuestionGenerator()
