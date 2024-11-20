import express from 'express'
import { editUser, forgotPassword, login, register, changePassword } from '../controllers/authController'
const router = express.Router()

// Đảm bảo `register` đã được khai báo đúng kiểu
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/change-password', changePassword)
router.put('/edit/:userId', editUser)
export default router
