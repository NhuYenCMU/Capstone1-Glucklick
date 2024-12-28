// src/controllers/courseController.ts
import { Request, Response, NextFunction } from 'express'
import Course from '../models/course'

export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.find() // Lấy tất cả dữ liệu từ bảng Course
    res.status(200).json(courses)
  } catch {
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách khóa học.' })
  }
}

export const searchCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { keyword } = req.query; // Lấy từ khóa từ query parameter

    if (!keyword || typeof keyword !== 'string') {
      res.status(400).json({ message: 'Từ khóa tìm kiếm không hợp lệ.' });
      return
    }

    // Tìm các khóa học có courseName chứa từ khóa (không phân biệt hoa/thường)
    const courses = await Course.find({
      courseName: { $regex: keyword, $options: 'i' } // 'i' để không phân biệt hoa/thường
    })

    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra khi tìm kiếm khóa học.', error })
  }
}
