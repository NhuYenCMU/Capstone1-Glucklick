// src/controllers/courseController.ts
import { Request, Response, NextFunction } from 'express'
import Course, { ICourse } from '../models/MyCourse'

// GET /api/courses - Get all courses
export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses: ICourse[] = await Course.find()
    console.log('Courses:', courses)
    res.status(200).json(courses)
  } catch (error) {
    next(error)
  }
}

// GET /api/courses/:id - Get a single course by ID
export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course: ICourse | null = await Course.findById(req.params.id)
    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }
    res.status(200).json(course)
  } catch (error) {
    next(error)
  }
}

// POST /api/courses - Create a new course
export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imageUrl, title, completion } = req.body
    const newCourse = new Course({ imageUrl, title, completion })
    const savedCourse = await newCourse.save()
    res.status(201).json(savedCourse)
  } catch (error) {
    next(error)
  }
}

// PUT /api/courses/:id - Update a course by ID
export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imageUrl, title, completion } = req.body
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { imageUrl, title, completion },
      { new: true, runValidators: true }
    )
    if (!updatedCourse) {
      res.status(404).json({ message: 'Course not found' })
      return
    }
    res.status(200).json(updatedCourse)
  } catch (error) {
    next(error)
  }
}

// DELETE /api/courses/:id - Delete a course by ID
export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id)
    if (!deletedCourse) {
      res.status(404).json({ message: 'Course not found' })
      return
    }
    res.status(200).json({ message: 'Course deleted successfully' })
  } catch (error) {
    next(error)
  }
}
