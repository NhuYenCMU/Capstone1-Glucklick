# generator/urls.py
from django.urls import path
from .views import GenerateQuestionAPI

urlpatterns = [
    path("generate-question/", GenerateQuestionAPI.as_view(), name="generate_question"),
]
