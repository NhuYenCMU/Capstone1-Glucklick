import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user';
import { generateToken } from '../utils/jwt';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra người dùng đã tồn tại
        const existingUser = await User.findOne({
          $or: [{ email }, { username }]
        });
        if (existingUser) {
            const message = existingUser.email === email
                ? 'Email already in use'
                : 'Username already in use';
            res.status(400).json({ message });
            return;
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo người dùng mới
        const newUser: IUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user'  // hoặc 'admin' tùy vào logic của bạn
        });

        await newUser.save();

        // Tạo JWT token
        const token = generateToken(newUser._id.toString());

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        next(error);
    }

};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const { username, password } = req.body;

      // Kiểm tra người dùng có tồn tại hay không
      const user = await User.findOne({ username });
      if (!user) {
          res.status(400).json({ message: 'Invalid username or password' });
          return;
      }

      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          res.status(400).json({ message: 'Invalid username or password' });
          return;
      }

      // Tạo token JWT
      const token = generateToken(user._id.toString());

      res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
      next(error);
  }
};
  
