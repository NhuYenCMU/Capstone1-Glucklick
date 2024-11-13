import express from 'express'
import { editUser, forgotPassword, login, register } from '../controllers/authController'
const router = express.Router()

// Đảm bảo `register` đã được khai báo đúng kiểu
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.put('/edit/:userId', editUser)
export default router
