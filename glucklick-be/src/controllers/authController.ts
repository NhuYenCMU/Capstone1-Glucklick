import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user';
import { generateToken } from '../utils/jwt';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra người dùng đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
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
