import warnings
import os
import random
import time
import torch
import nltk
import numpy as np
from transformers import T5ForConditionalGeneration, T5Tokenizer
from sense2vec import Sense2Vec
from sentence_transformers import SentenceTransformer
from nltk.corpus import wordnet as wn, stopwords
from nltk.tokenize import sent_tokenize
from sklearn.metrics.pairwise import cosine_similarity
from similarity.normalized_levenshtein import NormalizedLevenshtein
from flashtext import KeywordProcessor
import pickle
from collections import OrderedDict
import string
import pke

# Ignore warnings
warnings.filterwarnings("ignore")

# Set up device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Download required NLTK data
nltk.download("punkt")
nltk.download("stopwords")
nltk.download("wordnet")


# Function to load or download models and tokenizers
def load_model(model_class, model_path, pretrained_name):
    try:
        if os.path.exists(model_path):
            with open(model_path, "rb") as f:
                model = pickle.load(f)
            print(f"Loaded model from {model_path}")
        else:
            print(f"Downloading {pretrained_name}...")
            model = model_class.from_pretrained(pretrained_name)
            with open(model_path, "wb") as f:
                pickle.dump(model, f)
            print(f"Model saved to {model_path}")
        return model.to(device)
    except Exception as e:
        print(f"Error loading model: {e}")
        return None


def load_tokenizer(tokenizer_class, tokenizer_path, pretrained_name):
    try:
        if os.path.exists(tokenizer_path):
            with open(tokenizer_path, "rb") as f:
                tokenizer = pickle.load(f)
            print(f"Loaded tokenizer from {tokenizer_path}")
        else:
            print(f"Downloading tokenizer for {pretrained_name}...")
            tokenizer = tokenizer_class.from_pretrained(pretrained_name)
            with open(tokenizer_path, "wb") as f:
                pickle.dump(tokenizer, f)
            print(f"Tokenizer saved to {tokenizer_path}")
        return tokenizer
    except Exception as e:
        print(f"Error loading tokenizer: {e}")
        return None


# Load models and tokenizers
summary_model = load_model(
    T5ForConditionalGeneration, "t5_summary_model.pkl", "t5-base"
)
summary_tokenizer = load_tokenizer(T5Tokenizer, "t5_summary_tokenizer.pkl", "t5-base")

question_model = load_model(
    T5ForConditionalGeneration, "t5_question_model.pkl", "ramsrigouthamg/t5_squad_v1"
)
question_tokenizer = load_tokenizer(
    T5Tokenizer, "t5_question_tokenizer.pkl", "ramsrigouthamg/t5_squad_v1"
)

sentence_transformer_model = load_model(
    SentenceTransformer,
    "sentence_transformer_model.pkl",
    "sentence-transformers/msmarco-distilbert-base-v2",
)

# Load Sense2Vec
try:
    s2v = Sense2Vec().from_disk("s2v_old")
    print("Loaded Sense2Vec model.")
except Exception as e:
    print(f"Error loading Sense2Vec: {e}")
    s2v = None


# Utility functions
def set_seed(seed):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)


def postprocesstext(content):
    return " ".join(sent.capitalize() for sent in sent_tokenize(content)).strip()


def summarizer(text, model, tokenizer):
    try:
        text = "summarize: " + text.strip().replace("\n", " ")
        encoding = tokenizer.encode_plus(
            text, max_length=512, truncation=True, return_tensors="pt"
        ).to(device)
        input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]
        outputs = model.generate(
            input_ids=input_ids,
            attention_mask=attention_mask,
            early_stopping=True,
            num_beams=3,
            no_repeat_ngram_size=2,
            min_length=75,
            max_length=300,
        )
        summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return postprocesstext(summary)
    except Exception as e:
        print(f"Error in summarizer: {e}")
        return ""


def get_keywords(content):
    try:
        extractor = pke.unsupervised.MultipartiteRank()
        extractor.load_document(input=content, language="en")
        extractor.candidate_selection(pos={"NOUN", "PROPN", "ADJ"})
        extractor.candidate_weighting(alpha=1.1, threshold=0.75, method="average")
        return [phrase[0] for phrase in extractor.get_n_best(n=15)]
    except Exception as e:
        print(f"Error in keyword extraction: {e}")
        return []


def get_question(context, answer, model, tokenizer):
    try:
        text = f"context: {context} answer: {answer}"
        encoding = tokenizer.encode_plus(
            text, max_length=384, truncation=True, return_tensors="pt"
        ).to(device)
        outputs = model.generate(
            input_ids=encoding["input_ids"],
            attention_mask=encoding["attention_mask"],
            early_stopping=True,
            num_beams=5,
            no_repeat_ngram_size=2,
            max_length=72,
        )
        question = (
            tokenizer.decode(outputs[0], skip_special_tokens=True)
            .replace("question:", "")
            .strip()
        )
        return question
    except Exception as e:
        print(f"Error in question generation: {e}")
        return ""


def get_distractors(
    word, context, sense2vec_model, sentencemodel, top_n=5, lambda_val=0.7
):
    try:
        distractors = []
        if sense2vec_model:
            sense = sense2vec_model.get_best_sense(word)
            most_similar = sense2vec_model.most_similar(sense, n=top_n)
            distractors = [
                sim[0].split("|")[0] for sim in most_similar if sim[0] != word
            ]

        if sentencemodel:
            embeddings = sentencemodel.encode([context] + distractors)
            doc_embedding = embeddings[0]
            distractor_embeddings = embeddings[1:]
            distractors = mmr(
                doc_embedding, distractor_embeddings, distractors, top_n, lambda_val
            )
        return distractors
    except Exception as e:
        print(f"Error in distractor generation: {e}")
        return []


def get_mca_questions(context):
    try:
        summary = summarizer(context, summary_model, summary_tokenizer)
        keywords = get_keywords(context)
        questions = []
        for answer in keywords:
            question = get_question(summary, answer, question_model, question_tokenizer)
            distractors = get_distractors(
                answer, question, s2v, sentence_transformer_model
            )
            options = [answer.capitalize()] + distractors[:3]
            random.shuffle(options)
            formatted_question = f"{question}\n" + "\n".join(
                [f"({chr(97 + i)}) {opt}" for i, opt in enumerate(options)]
            )
            questions.append(formatted_question)
        return questions
    except Exception as e:
        print(f"Error in multiple-choice question generation: {e}")
        return []


# Example usage
if __name__ == "__main__":
    context = "Your text here"
    questions = get_mca_questions(context)
    for q in questions:
        print(q)
