// import Mailjet from 'node-mailjet'
// import { User } from '~/models/user'

// const mailJet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC as string, process.env.MJ_APIKEY_PRIVATE as string)

// // Hàm gửi email quên mật khẩu
// function sendForgotPasswordEmail(email: string, username: string, host: string, resetLink: string): Promise<any> {
//   // Tạo yêu cầu gửi email
//   const request = mailJet.post('send', { version: 'v3.1' }).request({
//     Messages: [
//       {
//         From: {
//           Email: 'thientbt03test@gmail.com',
//           Name: 'Glucklick'
//         },
//         To: [
//           {
//             Email: email,
//             Name: username
//           }
//         ],
//         Subject: 'Glucklick Reset Password',
//         HTMLPart: `
//           <p>Hi ${username},</p>
//           <br/>
//           <p>You recently requested to reset the password for your ${host} account.
//           Click the button below to proceed.</p>
//           <br/>
//           <p><a href="${resetLink}">Reset Password</a></p>
//           <br/>
//           <p>If you did not request a password reset, please ignore this email or reply to let us know.
//           This password reset link is only valid for the next 30 minutes.</p>
//           <br/>
//           <p>Thanks,</p>
//           <p>The Glucklick team</p>`
//       }
//     ]
//   })

//   return request // Trả về Promise từ hàm request
// }

// export default sendForgotPasswordEmail
