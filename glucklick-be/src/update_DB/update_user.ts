import mongoose from 'mongoose'
import connectDB from '../database'
import User from '../models/user'

const addSampleUsers = async () => {
  try {
    await connectDB()

    const newUsers = await User.insertMany([
      {
        username: 'new_user_1',
        email: 'newuser1@example.com',
        password: 'password123',
        role: 'member',
        bio: 'This is the bio for new_user_1'
      },
      {
        username: 'new_user_2',
        email: 'newuser2@example.com',
        password: 'password456',
        role: 'admin',
        bio: 'This is the bio for new_user_2'
      }
    ])

    console.log('Thêm dữ liệu mẫu thành công:', newUsers)

    process.exit()
  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu mẫu:', error)
    process.exit(1)
  }
}

addSampleUsers()
