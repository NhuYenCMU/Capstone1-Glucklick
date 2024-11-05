import mongoose, { Schema, Document } from 'mongoose';

export interface IRecommendation extends Document {
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    recommendedLessonId: mongoose.Types.ObjectId;
    reason: string;
    createdAt?: Date;
}

const RecommendationSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    recommendedLessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    reason: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IRecommendation>('Recommendation', RecommendationSchema);
