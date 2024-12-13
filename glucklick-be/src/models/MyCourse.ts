// src/models/MyCourse.ts
import mongoose, { Document, Schema } from 'mongoose'

export interface ICourse extends Document {
  imageUrl: string
  title: string
  completion: number
}

const CourseSchema: Schema = new Schema<ICourse>(
  {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    completion: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<ICourse>('MyCourse', CourseSchema)
