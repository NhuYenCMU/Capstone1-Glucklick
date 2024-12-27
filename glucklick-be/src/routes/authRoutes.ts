import express from 'express'
import { forgotPassword, login, register, changePassword, editUser, getUserById } from '../controllers/authController'
const router = express.Router()

// Đảm bảo `register` đã được khai báo đúng kiểu
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/change-password', changePassword)
<<<<<<< HEAD
router.get('/user/:userId', getUserById)
=======
>>>>>>> c49a89eed57b03e90e444973f87884c1ff028e2c
router.put('/editUser/:userId', editUser)
export default router
