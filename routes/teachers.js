import express from 'express';
import {
  createTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  markTeacherAttendance
} from '../controllers/teacherController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// ✅ Create a teacher (admin only)
router.post('/', authenticate, authorizeRoles('admin'), createTeacher);

// ✅ Get all teachers
router.get('/', authenticate, getAllTeachers);

// ✅ Get single teacher
router.get('/:id', authenticate, getTeacher);

// ✅ Update teacher (admin only)
router.put('/:id', authenticate, authorizeRoles('admin'), updateTeacher);

// ✅ Delete teacher (admin only)
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteTeacher);

// ✅ Mark attendance for teacher (admin or teacher)
router.post('/:id/attendance', authenticate, authorizeRoles('admin', 'teacher'), markTeacherAttendance);

export default router;
