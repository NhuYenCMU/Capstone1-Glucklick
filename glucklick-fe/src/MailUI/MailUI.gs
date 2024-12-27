function onFormSubmit(e) {
  Logger.log("Form submission triggered.");

  const responses = e.response.getItemResponses();
  let userEmail = "";
  let resultDetails = "";
  let totalScore = 0;

  // Xử lý các câu trả lời của form
  responses.forEach((response) => {
    const item = response.getItem();
    const title = item.getTitle();
    const answer = response.getResponse();

    Logger.log(`Processing question: ${title}, Answer: ${answer}`);

    if (title.toLowerCase().includes("email")) {
      userEmail = answer;
      Logger.log(`User email found: ${userEmail}`);
    } else {
      // Kiểm tra đúng/sai
      if (item.getType() === FormApp.ItemType.MULTIPLE_CHOICE) {
        const correctAnswers = item.asMultipleChoiceItem().getChoices().filter(choice => choice.isCorrectAnswer()).map(choice => choice.getValue());
        const isCorrect = correctAnswers.includes(answer);
        totalScore += isCorrect ? 1 : 0;
        resultDetails += `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${title}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${answer}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${isCorrect ? "✔️" : "❌"}</td>
          </tr>
        `;
      } else {
        resultDetails += `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${title}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${answer}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">N/A</td>
          </tr>
        `;
      }
    }
  });

  if (userEmail) {
    const subject = "Your Quiz Results";
    const message = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: auto;
              padding: 20px;
              background-color: #f9f9f9;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            h1 {
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th {
              background-color: #4CAF50;
              color: white;
              padding: 10px;
              text-align: left;
              border: 1px solid #ddd;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
            td {
              padding: 8px;
              border: 1px solid #ddd;
            }
            .score {
              font-size: 18px;
              font-weight: bold;
              margin-top: 20px;
              text-align: center;
              color: #4CAF50;
            }
          </style>
        </head>
        <body>
          <div class="container">
<h1>Your Quiz Results</h1>
            <p>Dear user,</p>
            <p>Thank you for completing the quiz! Below are your results:</p>
            <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Correct?</th>
                </tr>
              </thead>
              <tbody>
                ${resultDetails}
              </tbody>
            </table>
            <p class="score">Total Score: ${totalScore}</p>
            <p>Best regards,<br>Quiz Team</p>
          </div>
        </body>
      </html>
    `;

    GmailApp.sendEmail({
      to: userEmail,
      subject: subject,
      htmlBody: message,
    });

    Logger.log(`Email sent to: ${userEmail}`);
  } else {
    Logger.log("No email found in the submission.");
  }
}


function doPost(e) {
  try {
    Logger.log("doPost triggered with data: " + e.postData.contents);
    const jsonData = JSON.parse(e.postData.contents);

    // Tạo Google Form mới
    const form = FormApp.create("Quiz Test");
    Logger.log("New form created: " + form.getId());

    // Thiết lập quiz mode
    form.setIsQuiz(true);
    Logger.log("Quiz mode enabled.");

    // Thêm câu hỏi email
    const emailQuestion = form.addTextItem();
    emailQuestion.setTitle("Please enter your email address");
    emailQuestion.setRequired(true);
    Logger.log("Email question added.");

    // Thêm các câu hỏi từ JSON
    jsonData.forEach((item, index) => {
      const question = form.addMultipleChoiceItem();
      const options = Object.values(item.options);
      Logger.log(`Adding question ${index + 1}: ${item.Question}`);

      question.setTitle(item.Question);
      question.setChoices(
        options.map((option) =>
          option === item.options[item.correct_answer]
            ? question.createChoice(option, true)
            : question.createChoice(option)
        )
      );
      question.setPoints(1);
      Logger.log(`Question ${index + 1} added with options: ${options}`);
    });

    // Tạo Trigger tự động chạy khi người dùng submit form
    ScriptApp.newTrigger("onFormSubmit")
      .forForm(form) // Liên kết trigger với Form vừa tạo
      .onFormSubmit()
      .create();
    Logger.log("Trigger onFormSubmit created.");

    // Lấy URL Google Form đã xuất bản
    const formUrl = form.getPublishedUrl();
    Logger.log("Form published at URL: " + formUrl);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, formUrl: formUrl })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error in doPost: " + error.message);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}