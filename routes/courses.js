import express from 'express';
import { createCourse, getAllCourses, getCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('admin', 'teacher'), createCourse);
router.get('/', authenticate, getAllCourses);
router.get('/:id', authenticate, getCourse);
router.put('/:id', authenticate, authorizeRoles('admin', 'teacher'), updateCourse);
router.delete('/:id', authenticate, authorizeRoles('admin', 'teacher'), deleteCourse);

export default router;
