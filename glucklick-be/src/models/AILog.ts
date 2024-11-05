import mongoose, { Schema, Document } from 'mongoose';

export interface IAILog extends Document {
    userId: mongoose.Types.ObjectId;
    logMessage: string;
    createdAt?: Date;
}

const AILogSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    logMessage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAILog>('AILog', AILogSchema);
