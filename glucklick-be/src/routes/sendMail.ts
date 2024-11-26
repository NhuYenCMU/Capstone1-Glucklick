import { Router, Request, Response } from 'express'
import nodemailer from 'nodemailer'

const router = Router()

// Định nghĩa kiểu cho req.body
interface EmailRequestBody {
  to: string
  subject: string
  text?: string
  html?: string
}

// Endpoint gửi email
router.post('/send-email', async (req: Request<object, object, EmailRequestBody>, res: Response): Promise<void> => {
  const { to, subject, text, html } = req.body

  // Kiểm tra đầu vào
  if (!to || !subject || (!text && !html)) {
    res.status(400).json({ error: 'Missing required fields: to, subject, and at least one of text or html.' })
    return
  }

  // Kiểm tra biến môi trường
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS

  if (!emailUser || !emailPass) {
    res.status(500).json({ error: 'Email configuration is missing. Check environment variables.' })
    return
  }

  try {
    // Cấu hình transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass
      }
    })

    // Cấu hình nội dung email
    const mailOptions = {
      from: `"Admin" <${emailUser}>`,
      to,
      subject,
      text: text || undefined,
      html: html || undefined
    }

    // Gửi email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully. Message ID:', info.messageId)

    res.status(200).json({ message: 'Email sent successfully.', messageId: info.messageId })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({
      error: 'Failed to send email.',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
