// src/routes/courseRoutes.ts
import express from 'express'
import { getCourses, searchCourses } from '../controllers/courseController';

const router = express.Router()

// GET /api/courses - Get all courses
router.get('/courses', getCourses)
router.get('/courses/search', searchCourses)

export default router
