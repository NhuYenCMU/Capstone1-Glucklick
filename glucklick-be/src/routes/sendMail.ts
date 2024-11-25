import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";

const router = Router();

// Định nghĩa kiểu cho req.body
interface EmailRequestBody {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

// Endpoint gửi email
router.post("/send-email", async (req: Request<{}, {}, EmailRequestBody>, res: Response): Promise<void> => {
    const { to, subject, text, html } = req.body;

    // Kiểm tra đầu vào
    if (!to || !subject || (!text && !html)) {
        res.status(400).json({ message: "Thiếu thông tin cần thiết." });
        return;
    }

    try {
        // Cấu hình transporter với Gmail
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ADMIN,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Cấu hình nội dung email
        const mailOptions = {
            from: `"" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text: text || undefined,
            html: html || undefined,
        };

        // Gửi email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);

        res.status(200).json({ message: "Email sent successfully", messageId: info.messageId });
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({ message: "Failed to send email", error: error instanceof Error ? error.message : error });
    }
});

export default router;
