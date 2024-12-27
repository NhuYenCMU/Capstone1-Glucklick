import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import authRoutes from './routes/authRoutes'
import router from './routes/sendMail'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

// Routes
app.use('/api/auth', authRoutes)
app.use(router)

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/glucklick', {})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error))

// Start the server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
