import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import User, { IUser } from '../models/user'
import { generateToken } from '../utils/jwt'
import { models } from 'mongoose'

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
// Hàm hiển thị trang "forgot-password" để người dùng có thể nhập email
// export const showforgotPassword = (req: Request, res: Response): void => {
//   res.render('forgot-password') // Render trang "forgot-password"
// }

// // Hàm xử lý yêu cầu quên mật khẩu
// export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Lấy email từ yêu cầu của người dùng
//     const email = req.body.email

//     // Kiểm tra xem email có tồn tại trong hệ thống không
//     const user = await models.User.findOne({ where: { email } })

//     if (user) {
//       //Tao link
//       const{sign} = require('./jwt');
//       const{host} = req.header('host');
//       const resetLink =
//       // Nếu tìm thấy email, tạo link hoặc hiển thị trạng thái "done"
//       res.render('forgot-password', { done: true })
//     } else {
//       // Nếu không tìm thấy email, hiển thị thông báo lỗi trên trang "forgot-password"
//       res.render('forgot-password', { message: 'Email does not exist!' })
//     }
//   } catch (error) {
//     // Xử lý lỗi nếu có sự cố trong quá trình kiểm tra email
//     console.error('Error in forgotPassword function:', error)
//     // Trả về mã lỗi 500 và thông báo lỗi cho người dùng
//     res.status(500).json({ message: 'Internal Server Error' })
//   }
// }
