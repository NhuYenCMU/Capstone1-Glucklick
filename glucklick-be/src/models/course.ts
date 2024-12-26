import mongoose, { Schema, Document } from 'mongoose'
import { getCourseById } from '../controllers/courseController'

export interface ICourse extends Document {
  courseName: string
  description?: string
  difficultyLevel: string
  price?: number // Giá tiền, kiểu số
  rating?: number // Đánh giá, kiểu số (thường từ 0-5)
  createdAt?: Date
  link?: string
}

const CourseSchema: Schema = new Schema({
  courseName: { type: String, required: true },
  description: { type: String },
  difficultyLevel: { type: String, required: true },
  price: { type: Number }, // Trường mới: Giá tiền
  rating: { type: Number, min: 0, max: 5 }, // Trường mới: Đánh giá từ 0 đến 5
  createdAt: { type: Date, default: Date.now },
  link: { type: String }
})

export default mongoose.model<ICourse>('Course', CourseSchema)
