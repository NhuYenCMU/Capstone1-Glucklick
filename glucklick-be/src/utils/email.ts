import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.EMAIL_PASS
  }
})

export default transporter
