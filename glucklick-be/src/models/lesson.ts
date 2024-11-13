import mongoose, { Schema, Document } from 'mongoose'

export interface ILesson extends Document {
  courseId: mongoose.Types.ObjectId
  lessonName: string
  content: string
  position: number
  createdAt?: Date
}

const LessonSchema: Schema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  lessonName: { type: String, required: true },
  content: { type: String },
  position: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model<ILesson>('Lesson', LessonSchema)
