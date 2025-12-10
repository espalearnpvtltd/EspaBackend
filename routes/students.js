
// routes/students.js
import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  markAttendance
} from '../controllers/studentController.js';
import { authenticateUser, verifySecretKey } from '../middleware/auth.js';

const router = express.Router();

// ✅ Create Student (requires secret key - admin only)
router.post('/', verifySecretKey, createStudent);

// ✅ Get All Students (requires JWT)
router.get('/', authenticateUser, getAllStudents);

// ✅ Get Single Student (requires JWT)
router.get('/:id', authenticateUser, getStudent);

// ✅ Update Student (requires JWT)
router.put('/:id', authenticateUser, updateStudent);

// ✅ Delete Student (requires JWT)
router.delete('/:id', authenticateUser, deleteStudent);

// ✅ Attendance (requires JWT)
router.post('/:id/attendance', authenticateUser, markAttendance);

export default router;