import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  username: string
  email: string
  password: string
  createdAt?: Date
  role: string
  resetPasswordToken?: string // Token dùng để đặt lại mật khẩu
  resetPasswordExpires?: Date // Thời hạn của token đặt lại mật khẩu
  bio?: string
  profilePic: string
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  bio: { type: String },
  profilePic: { type: String, default: '' }
})

export default mongoose.model<IUser>('users', UserSchema)
