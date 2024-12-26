import mongoose from 'mongoose'
import connectDB from '../database' // Đảm bảo kết nối MongoDB
import Course from '../models/course'

const addSampleCourses = async () => {
  try {
    // Kết nối đến MongoDB
    await connectDB()

    // Thêm các khóa học mẫu vào MongoDB
    const courses = await Course.insertMany([
      {
        courseName: 'JavaScript cơ bản',
        description: 'Khóa học giới thiệu về JavaScript, từ cơ bản đến nâng cao.',
        difficultyLevel: 'Beginner',
        price: 120, // Giá tiền mẫu
        rating: 4.5, // Đánh giá mẫu
      },
      {
        courseName: 'Lập trình Web với React',
        description: 'Khóa học về lập trình web sử dụng ReactJS.',
        difficultyLevel: 'Intermediate',
        price: 150,
        rating: 4.7,
      },
      {
        courseName: 'Node.js và ExpressJS',
        description: 'Khóa học về xây dựng backend với Node.js và ExpressJS.',
        difficultyLevel: 'Advanced',
        price: 200,
        rating: 4.8,
      },
      {
        courseName: 'Giới thiệu về AI và Machine Learning',
        description: 'Khóa học giới thiệu cơ bản về AI và học máy.',
        difficultyLevel: 'Beginner',
        price: 180,
        rating: 4.6,
      },
      {
        courseName: 'Dữ liệu lớn (Big Data)',
        description: 'Khóa học tìm hiểu về Big Data và công cụ xử lý dữ liệu lớn.',
        difficultyLevel: 'Advanced',
        price: 250,
        rating: 4.9,
      }
    ])

    console.log('Đã thêm dữ liệu mẫu cho khóa học:', courses)
    process.exit() // Thoát sau khi hoàn thành
  } catch (error) {
    console.error('Lỗi khi thêm khóa học mẫu:', error)
    process.exit(1) // Thoát khi có lỗi
  }
}

addSampleCourses()
