import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import User, { IUser } from '../models/user'
import { generateToken } from '../utils/jwt'
import { models } from 'mongoose'
import * as crypto from 'crypto'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../utils/jwt' // Hàm xác thực token
import { sendEmail } from '../services/emailService'

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body

    // Kiểm tra người dùng đã tồn tại
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })
    if (existingUser) {
      const message = existingUser.email === email ? 'Email already in use' : 'Username already in use'
      res.status(400).json({ message })
      return
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Tạo người dùng mới
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user' // hoặc 'admin' tùy vào logic của bạn
    })

    await newUser.save()

    // Tạo JWT token
    const token = generateToken(newUser._id.toString())

    res.status(201).json({ message: 'User registered successfully', token })
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body

    // Kiểm tra người dùng có tồn tại hay không
    const user = await User.findOne({ username })
    if (!user) {
      res.status(400).json({ message: 'Invalid username or password' })
      return
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid username or password' })
      return
    }

    // Tạo token JWT
    const token = generateToken(user._id.toString())

    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    next(error)
  }
}
// Hàm editUser để cập nhật thông tin người dùng
export const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params // Lấy userId từ tham số URL
    const { username, email, password } = req.body // Các trường cần cập nhật

    // Xác thực các trường cần thiết ở đây nếu cần thiết

    // Cập nhật người dùng trong cơ sở dữ liệu
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true } // Trả về người dùng sau khi đã cập nhật
    )

    // Kiểm tra nếu không tìm thấy người dùng
    if (!updatedUser) {
      res.status(404).json({ message: 'Không tìm thấy người dùng' })
      return
    }

    // Trả về phản hồi thành công với thông tin người dùng đã cập nhật
    res.json({ message: 'Cập nhật người dùng thành công', user: updatedUser })
  } catch (error) {
    // Xử lý lỗi và trả về phản hồi lỗi
    res.status(500).json({ message: 'Lỗi khi cập nhật người dùng', error: (error as Error).message })
  }
}
// Chức năng quên mật khẩu
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body

    // Kiểm tra xem người dùng có tồn tại hay không
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({ message: 'Không tìm thấy người dùng' })
      return
    }

    // Tạo mã reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // Token có hiệu lực trong 1 giờ

    // Lưu mã token đã mã hóa và thời hạn vào tài liệu người dùng
    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = resetTokenExpiry
    await user.save()

    // Tạo URL và nội dung email
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`
    const message = `Vui lòng sử dụng liên kết sau để đặt lại mật khẩu của bạn: \n\n ${resetUrl}`

    // Gửi email
    await sendEmail(user.email, 'Yêu cầu đặt lại mật khẩu', message)

    res.status(200).json({ message: 'Email đặt lại mật khẩu đã được gửi' })
  } catch (error) {
    next(error)
  }
}
// chức năng thay đổi mật khẩu
export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body

    // Lấy token từ header Authorization
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      res.status(401).json({ message: 'Authentication token is missing' })
      return
    }

    // Xác thực token và lấy userId từ token
    const decoded = verifyToken(token) // verifyToken là hàm giải mã token, bạn cần đảm bảo đã viết hàm này
    const userId = decoded.userId
    if (!decoded || !userId) {
      res.status(401).json({ message: 'Invalid token' })
      return
    }
    // const userId = decoded.id

    // Tìm người dùng theo userId
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      res.status(400).json({ message: 'Old password is incorrect' })
      return
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Cập nhật mật khẩu trong cơ sở dữ liệu
    user.password = hashedPassword
    await user.save()

    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    next(error)
  }
}
