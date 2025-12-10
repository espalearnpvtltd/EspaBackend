import express from 'express';
import {
  createTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  markTeacherAttendance
} from '../controllers/teacherController.js';
import { verifySecretKey } from '../middleware/auth.js';

const router = express.Router();

// ✅ Create a teacher (requires secret key)
router.post('/', verifySecretKey, createTeacher);

// ✅ Get all teachers
router.get('/', getAllTeachers);

// ✅ Get single teacher
router.get('/:id', getTeacher);

// ✅ Update teacher (requires secret key)
router.put('/:id', verifySecretKey, updateTeacher);

// ✅ Delete teacher (requires secret key)
router.delete('/:id', verifySecretKey, deleteTeacher);

// ✅ Mark attendance for teacher (requires secret key)
router.post('/:id/attendance', verifySecretKey, markTeacherAttendance);

export default router;
