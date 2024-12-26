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
        courseName: 'Lập trình Java Backend Full Steps',
        description: 'Viết tài liệu yêu cầu, thiết kế infra, thiết kế database, thiết kế UI/UX, Phát triển Ứng dụng, Triển khai CI/CD.',
        difficultyLevel: 'Beginner',
        price: 299, // Giá tiền mẫu
        rating: 4.6, // Đánh giá mẫu
        link: 'https://www.udemy.com/course/lap-trinh-java-backend-full-steps/?couponCode=2021PM25'
      },
      {
        courseName: 'Lập trình Java cho người mới học',
        description: 'Lý thuyết ngắn gọn, thực hành chi tiết dễ hiểu và vận dụng viết mã dự án',
        difficultyLevel: 'Beginner',
        price: 349,
        rating: 4.8,
        link: 'https://www.udemy.com/course/lap-trinh-java-cho-nguoi-moi-hoc/?couponCode=2021PM25'
      },
      {
        courseName: 'Build Basic Android Apps with Java',
        description: 'By the end of this Skill Path, you will have created your very own fully functional quiz game for Android Devices with Java. Includes Java, XML, Android Studio, Wireframing, Layout Editor, Material Design, and more..',
        difficultyLevel: 'Beginner',
        price: 499,
        rating: 4.8,
        link: 'https://www.codecademy.com/learn/paths/introduction-to-android-with-java'
      },
    ])

    console.log('Đã thêm dữ liệu mẫu cho khóa học:', courses)
    process.exit() // Thoát sau khi hoàn thành
  } catch (error) {
    console.error('Lỗi khi thêm khóa học mẫu:', error)
    process.exit(1) // Thoát khi có lỗi
  }
}

addSampleCourses()
