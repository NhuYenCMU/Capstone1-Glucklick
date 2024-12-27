import express from 'express'
import { forgotPassword, login, register, changePassword, editUser, getUserById } from '../controllers/authController'
const router = express.Router()

// Đảm bảo `register` đã được khai báo đúng kiểu
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/change-password', changePassword)
router.get('/user/:userId', getUserById)
router.put('/editUser/:userId', editUser)
export default router
