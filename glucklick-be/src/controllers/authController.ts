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
import { validatePassword } from '../utils/validatePassword'
import cors from 'cors'

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body

    // Validate password strength
    const passwordError = validatePassword(password)
    if (passwordError) {
      res.status(400).json({ message: passwordError })
      return
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })
    if (existingUser) {
      const message = existingUser.email === email ? 'Email already in use' : 'Username already in use'
      res.status(400).json({ message })
      return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Construct avatar URL based on username
    const avatarUrl = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(username)}`

    // Create a new user with the avatar URL
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user', // Default role; modify as needed
      avatar: avatarUrl // Add avatar field
    })

    await newUser.save()

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d' // Token expiration (e.g., 1 day)
    })

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.profilePic // Include avatar in the response
      }
    })
  } catch (error) {
    next(error) // Pass error to global error handler
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
    const { userId } = req.params // Get userId from URL params
    const { username, email, bio, profilePic } = req.body // Fields to update

    // Check if the user exists
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Create an object to hold the fields to update
    const updateFields: Partial<IUser> = {}

    // Update the fields if they are provided and differ from the existing data
    if (username && username !== user.username) updateFields.username = username
    if (email && email !== user.email) updateFields.email = email
    if (bio && bio !== user.bio) updateFields.bio = bio
    if (profilePic && profilePic !== user.profilePic) updateFields.profilePic = profilePic

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true })

    // If the user couldn't be updated, return an error
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found after update' })
      return
    }

    // Return a successful response with updated user data
    res.json({
      message: 'User updated successfully',
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio || '', // Ensure bio is returned as an empty string if null
        profilePic: updatedUser.profilePic || '' // Ensure profilePic is returned with a default if empty
      }
    })
  } catch (error) {
    // Handle any errors that occurred
    res.status(500).json({ message: 'Error updating user', error: (error as Error).message })
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
