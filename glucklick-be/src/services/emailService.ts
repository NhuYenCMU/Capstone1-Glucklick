import transporter from '../utils/email'

/**
 * Hàm gửi email
 * @param to Địa chỉ email người nhận
 * @param subject Chủ đề email
 * @param text Nội dung email (text format)
 * @param html Nội dung email (HTML format, tùy chọn)
 */
export const sendEmail = async (to: string, subject: string, text: string, html?: string): Promise<void> => {
  try {
    await transporter.sendMail({
      to,
      subject,
      text,
      html // Nếu có HTML, sẽ được ưu tiên
    })
    console.log(`Email đã được gửi tới: ${to}`)
  } catch (error) {
    console.error('Lỗi khi gửi email:', error)
    throw new Error('Không thể gửi email')
  }
}
