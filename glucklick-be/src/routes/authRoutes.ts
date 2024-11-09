import express from 'express';
import { register } from '../controllers/authController';

const router = express.Router();

// Đảm bảo `register` đã được khai báo đúng kiểu
router.post('/register', register);

export default router;
