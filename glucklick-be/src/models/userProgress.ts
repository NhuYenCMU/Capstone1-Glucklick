import mongoose, { Schema, Document } from 'mongoose'

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId
  courseId: mongoose.Types.ObjectId
  lessonId: mongoose.Types.ObjectId
  progress: number
  lastAccessed?: Date
}

const UserProgressSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
  progress: { type: Number, required: true },
  lastAccessed: { type: Date, default: Date.now }
})

export default mongoose.model<IUserProgress>('UserProgress', UserProgressSchema)
