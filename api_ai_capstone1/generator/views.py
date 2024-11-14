# generator/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .utils import question_generator


class GenerateQuestionAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]  # Chỉ cho phép người dùng xác thực

    def post(self, request):
        data = request.data
        context = data.get("context", "")
        num_distractors = data.get("num_distractors", 3)

        if not context:
            return Response(
                {"error": "Context is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        result = question_generator.generate_question_with_choices(
            context, num_distractors=num_distractors
        )

        if result:
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Failed to generate question and answers"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
