import connectDB from './database'
import User from './models/user'
import Course from './models/course'
import UserProgress from './models/userProgress'
import Lesson from './models/lesson'
import Recommendation from './models/recommendation'
import Feedback from './models/feedback'
import AILog from './models/AILog'
import mongoose from 'mongoose'

const seedData = async () => {
  try {
    await connectDB()

    // Xóa dữ liệu cũ
    await User.deleteMany({})
    await Course.deleteMany({})
    await UserProgress.deleteMany({})
    await Lesson.deleteMany({})
    await Recommendation.deleteMany({})

    // Tạo dữ liệu mẫu cho User
    const users = await User.insertMany([
      { username: 'john_doe', email: 'john@example.com', password: 'password123', role: 'member' },
      { username: 'jane_doe', email: 'jane@example.com', password: 'password456', role: 'admin' }
    ])
    console.log('Đã thêm dữ liệu mẫu cho User')

    // Tạo dữ liệu mẫu cho Course
    const courses = await Course.insertMany([
      { courseName: 'Introduction to Programming', description: 'Basics of programming', difficultyLevel: 'Beginner' },
      { courseName: 'Advanced JavaScript', description: 'Deep dive into JavaScript', difficultyLevel: 'Advanced' }
    ])
    console.log('Đã thêm dữ liệu mẫu cho Course')

    // Tạo dữ liệu mẫu cho Lesson
    const lessons = await Lesson.insertMany([
      {
        courseId: courses[0]._id,
        lessonName: 'Variables and Data Types',
        content: 'Introduction to variables',
        position: 1
      },
      {
        courseId: courses[1]._id,
        lessonName: 'Async Programming',
        content: 'Understanding asynchronous code',
        position: 1
      }
    ])
    console.log('Đã thêm dữ liệu mẫu cho Lesson')

    // Tạo dữ liệu mẫu cho UserProgress
    await UserProgress.insertMany([
      { userId: users[0]._id, courseId: courses[0]._id, lessonId: lessons[0]._id, progress: 0.75 },
      { userId: users[1]._id, courseId: courses[1]._id, lessonId: lessons[1]._id, progress: 0.5 }
    ])
    console.log('Đã thêm dữ liệu mẫu cho UserProgress')

    // Tạo dữ liệu mẫu cho Recommendation
    await Recommendation.insertMany([
      {
        userId: users[0]._id,
        courseId: courses[0]._id,
        recommendedLessonId: lessons[0]._id,
        reason: 'Start with basics'
      },
      {
        userId: users[1]._id,
        courseId: courses[1]._id,
        recommendedLessonId: lessons[1]._id,
        reason: 'Improve async understanding'
      }
    ])
    console.log('Đã thêm dữ liệu mẫu cho Recommendation')

    //Tạo dữ liệu mẫu cho Feedback
    await Feedback.insertMany([
      { userId: users[0]._id, lessonId: lessons[0]._id, feedbackText: 'Good', rating: 4.5 },
      { userId: users[1]._id, lessonId: lessons[1]._id, feedbackText: 'Bad', rating: 1.0 }
    ])
    console.log('Đã thêm dữ liệu mẫu cho Feedback')

    //Tạo dữ liệu mẫu cho AILog
    await AILog.insertMany([
      { userId: users[0]._id, logMessage: 'Done' },
      { userId: users[1]._id, logMessage: 'In Progress 50%' }
    ])
    console.log('Đã thêm dữ liệu mẫu cho AILog')

    process.exit()
  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu mẫu:', error)
    process.exit(1)
  }
}

seedData()
