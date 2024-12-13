// src/routes/courseRoutes.ts
import express from 'express'
import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } from '../controllers/courseController'

const router = express.Router()

// GET /api/courses - Get all courses
router.get('/getCourses', getCourses)

// GET /api/courses/:id - Get a single course by ID
router.get('/:id', getCourseById)

// POST /api/courses - Create a new course
router.post('/createCourse', createCourse)

// PUT /api/courses/:id - Update a course by ID
router.put('/:id', updateCourse)

// DELETE /api/courses/:id - Delete a course by ID
router.delete('/:id', deleteCourse)

export default router
