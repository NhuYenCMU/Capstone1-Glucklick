import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/auth', authRoutes)

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/glucklick')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error))

// Start the server
const PORT = process.env.PORT || 5003
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) // Sửa lỗi backticks ở đây
