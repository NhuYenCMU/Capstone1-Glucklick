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
        courseName: 'Python cho người mới bắt đầu',
        description: 'Khóa học cung cấp trọn bộ kiến thức cơ bản của lập trình Python, học viên có thể tạo ra một ứng dụng hoàn chỉnh với Python sau khi hoàn thành khóa học.',
        difficultyLevel: 'Beginner',
        price: 499, // Giá tiền mẫu
        rating: 4.9, // Đánh giá mẫu
        link: 'https://codelearn.io/learning/python-cho-nguoi-moi-bat-dau'
      },
      {
        courseName: 'Giải thuật cho Python',
        description: 'Khóa học này sẽ cung cấp kiến thức về thiết kế, phân tích và triển khai thuật toán bằng Python. Học viên sẽ trang bị các kỹ thuật thuật toán cơ bản, phân tích độ phức tạp, và giải quyết các vấn đề tính toán.',
        difficultyLevel: 'Intermediate',
        price: 699,
        rating: 4.9,
        link: 'https://codelearn.io/learning/giai-thuat-cho-python'
      },
      {
        courseName: 'Lập trình C++ cơ bản',
        description: 'Khóa học cung cấp nền tảng vững chắc về C++ cho người mới bắt đầu, giúp họ phát triển kỹ năng lập trình cơ bản và áp dụng vào các dự án thực tế.',
        difficultyLevel: 'Beginner',
        price: 499,
        rating: 4.8,
        link: 'https://codelearn.io/learning/lap-trinh-cpp-co-ban'
      },
      {
        courseName: 'Lập trình C++ nâng cao',
        description: 'Khóa học C++ nâng cao được thiết kế dành cho những lập trình viên đã có kiến thức cơ bản về C++ và mong muốn nâng cao kỹ năng lập trình của mình.',
        difficultyLevel: 'Advanced',
        price: 180,
        rating: 4.6,
        link: 'https://codelearn.io/learning/lap-trinh-cpp-nang-cao'
      },
      {
        courseName: 'Lập trình hướng đối tượng trong C++',
        description: 'Khóa học giúp các lập trình viên học được kỹ thuật lập trình mà tất cả logic, yêu cầu thực tế đều được xây dựng xoay quanh đối tượng',
        difficultyLevel: 'Beginner',
        price: 0,
        rating: 4.9,
        link: 'https://codelearn.io/learning/lap-trinh-huong-doi-tuong-trong-cpp'
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
