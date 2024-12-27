require("dotenv").config('../../../');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { StatusCodes } = require("http-status-codes");
require('http-status-codes').StatusCodes
// Cấu hình API Key từ biến môi trường
const API_KEY = process.env.GEMINI_API_KEY;

// Tạo đối tượng GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(API_KEY);

// Hàm thực thi
const generateMCQ = async (req, res) => {
  const numQuestion = req.body.num_Questions || ''
  const text_generation = req.body.text
  const prompt = `
Create a list of ${numQuestion} multiple choice questions based on the following text. Each question must have:
1. A "Question" (the generated question text).
2. Four "options" labeled as "A", "B", "C", and "D".
3. The "correct_answer" that matches one of the options.


Return the output in a valid JSON format with the following structure:
{
  "question_list": [
    {
      "id": "Q1",
      "Question": "Generated question here",
      "options": {
        "A": "Option A text",
        "B": "Option B text",
        "C": "Option C text",
        "D": "Option D text"
      },
      "correct_answer": "A" // or "B", "C", "D"
    },
    {
      "id": "Q2",
      "Question": "Generated question here",
      "options": {
        "A": "Option A text",
        "B": "Option B text",
        "C": "Option C text",
        "D": "Option D text"
      },
      "correct_answer": "B" // or "A", "C", "D"
    }
  ]
}
  Here is the text must be generated MCQ ${text_generation}
`;

  if (!text_generation || text_generation.length >= 8000) {
    return res.status(StatusCodes.BAD_REQUEST).json('Input text is invalid or too long');
  }
  const text = text_generation
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  });

  // Khởi tạo phiên trò chuyện (chat session)
  const chatSession = model.startChat({
    history: [],
  });

  try {
    // Gửi tin nhắn và nhận phản hồi
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

module.exports = { generateMCQ }