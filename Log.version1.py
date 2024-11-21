# Import all necessary libraries
import warnings

warnings.filterwarnings("ignore")
import torch
from transformers import T5ForConditionalGeneration, T5Tokenizer
from sense2vec import Sense2Vec
from sentence_transformers import SentenceTransformer
import random
import numpy as np
import nltk
from nltk.corpus import wordnet as wn
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
import string
import pke
from flashtext import KeywordProcessor
from sklearn.metrics.pairwise import cosine_similarity
from similarity.normalized_levenshtein import NormalizedLevenshtein
import pickle
import time
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize device for PyTorch
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
logger.info(f"Device selected: {device}")

# Initialize Sense2Vec
try:
    s2v = Sense2Vec().from_disk("s2v_old")
    logger.info("Loaded Sense2Vec model.")
except FileNotFoundError:
    raise RuntimeError(
        "Sense2Vec model 's2v_old' not found. Please download it and place it in the correct directory."
    )


# Load or initialize the summary model
def load_model(file_path, model_name):
    if os.path.exists(file_path):
        try:
            with open(file_path, "rb") as f:
                model = pickle.load(f)
            logger.info(f"Loaded {model_name} from disk.")
        except (FileNotFoundError, pickle.UnpicklingError):
            logger.error(f"Error loading {model_name}. Reinitializing...")
            model = None
    else:
        model = None
    return model


def save_model(model, file_path):
    with open(file_path, "wb") as f:
        pickle.dump(model, f)
    logger.info(f"Saved model to {file_path}.")


summary_model = load_model("t5_summary_model.pkl", "summary model")
if not summary_model:
    summary_model = T5ForConditionalGeneration.from_pretrained("t5-base")
    save_model(summary_model, "t5_summary_model.pkl")

summary_tokenizer = load_model("t5_summary_tokenizer.pkl", "summary tokenizer")
if not summary_tokenizer:
    summary_tokenizer = T5Tokenizer.from_pretrained("t5-base")
    save_model(summary_tokenizer, "t5_summary_tokenizer.pkl")

# Load or initialize question model
question_model = load_model("t5_question_model.pkl", "question model")
if not question_model:
    question_model = T5ForConditionalGeneration.from_pretrained(
        "ramsrigouthamg/t5_squad_v1"
    )
    save_model(question_model, "t5_question_model.pkl")

question_tokenizer = load_model("t5_question_tokenizer.pkl", "question tokenizer")
if not question_tokenizer:
    question_tokenizer = T5Tokenizer.from_pretrained("ramsrigouthamg/t5_squad_v1")
    save_model(question_tokenizer, "t5_question_tokenizer.pkl")

# Load sentence transformer
sentence_transformer_model = load_model(
    "sentence_transformer_model.pkl", "sentence transformer model"
)
if not sentence_transformer_model:
    sentence_transformer_model = SentenceTransformer(
        "sentence-transformers/msmarco-distilbert-base-v2"
    )
    save_model(sentence_transformer_model, "sentence_transformer_model.pkl")

# Move models to the selected device
summary_model = summary_model.to(device)
question_model = question_model.to(device)


# Utility functions
def set_seed(seed: int):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if device.type == "cuda":
        torch.cuda.manual_seed_all(seed)


def postprocesstext(content):
    return " ".join([sent.capitalize() for sent in sent_tokenize(content)])


def summarizer(text, model, tokenizer):
    text = text.strip().replace("\n", " ")
    text = "summarize: " + text
    max_len = 512
    encoding = tokenizer.encode_plus(
        text,
        max_length=max_len,
        padding="max_length",
        truncation=True,
        return_tensors="pt",
    ).to(device)

    input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

    outs = model.generate(
        input_ids=input_ids,
        attention_mask=attention_mask,
        early_stopping=True,
        num_beams=3,
        num_return_sequences=1,
        no_repeat_ngram_size=2,
        min_length=75,
        max_length=300,
    )

    summary = tokenizer.decode(outs[0], skip_special_tokens=True)
    return postprocesstext(summary.strip())


def get_nouns_multipartite(content):
    extractor = pke.unsupervised.MultipartiteRank()
    extractor.load_document(input=content, language="en")
    pos = {"PROPN", "NOUN"}
    stoplist = list(string.punctuation) + stopwords.words("english")
    extractor.candidate_selection(pos=pos, stoplist=stoplist)
    extractor.candidate_weighting(alpha=1.1, threshold=0.75, method="average")
    return [val[0] for val in extractor.get_n_best(n=15)]


def get_question(context, answer, model, tokenizer):
    text = f"context: {context} answer: {answer}"
    encoding = tokenizer.encode_plus(
        text, max_length=384, padding="max_length", truncation=True, return_tensors="pt"
    ).to(device)
    outs = model.generate(
        input_ids=encoding["input_ids"],
        attention_mask=encoding["attention_mask"],
        early_stopping=True,
        num_beams=5,
        no_repeat_ngram_size=2,
        max_length=72,
    )
    return (
        tokenizer.decode(outs[0], skip_special_tokens=True)
        .replace("question:", "")
        .strip()
    )


def get_distractors_wordnet(word):
    distractors = []
    try:
        syn = wn.synsets(word, "n")[0]
        hypernym = syn.hypernyms()
        if hypernym:
            for item in hypernym[0].hyponyms():
                name = item.lemmas()[0].name().replace("_", " ").capitalize()
                if name.lower() != word.lower() and name not in distractors:
                    distractors.append(name)
    except Exception:
        pass
    return distractors


def get_mca_questions(context: str):
    summarized_text = summarizer(context, summary_model, summary_tokenizer)
    keywords = get_nouns_multipartite(context)
    questions = []

    for answer in keywords:
        question = get_question(
            summarized_text, answer, question_model, question_tokenizer
        )
        distractors = get_distractors_wordnet(answer)
        distractors = distractors[:3] if distractors else keywords[:3]
        random.shuffle(distractors)
        correct_pos = random.randint(0, len(distractors))
        options = distractors[:]
        options.insert(correct_pos, answer)
        questions.append(
            {
                "question": question,
                "options": options,
                "answer": answer,
            }
        )

    return questions


# Example usage
if __name__ == "__main__":
    text = "Your input text here."
    mca_questions = get_mca_questions(text)
    for q in mca_questions:
        print(f"Q: {q['question']}")
        for i, opt in enumerate(q["options"]):
            print(f"  {chr(97 + i)}) {opt}")
        print(f"Answer: {q['answer']}\n")
