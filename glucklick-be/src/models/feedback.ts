import mongoose, { Schema, Document } from 'mongoose'

export interface IFeedback extends Document {
  userId: mongoose.Types.ObjectId
  lessonId: mongoose.Types.ObjectId
  feedbackText: string
  rating: number
  createdAt?: Date
}

const FeedbackSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
  feedbackText: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema)
