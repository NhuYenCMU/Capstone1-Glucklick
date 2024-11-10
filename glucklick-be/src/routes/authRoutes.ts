import express from 'express';
import { login, register } from '../controllers/authController';
const router = express.Router();

// Đảm bảo `register` đã được khai báo đúng kiểu
router.post('/register', register);
router.post('/login', login);

export default router;
