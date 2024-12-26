import mongoose, { Schema, Document } from 'mongoose'
import { getCourses } from '../controllers/courseController'

export interface ICourse extends Document {
  courseName: string
  description?: string
  difficultyLevel: string
  createdAt?: Date
}

const CourseSchema: Schema = new Schema({
  courseName: { type: String, required: true },
  description: { type: String },
  difficultyLevel: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model<ICourse>('Course', CourseSchema)
