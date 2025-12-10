
// routes/students.js
import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  markAttendance,
  registerStudent,
  loginStudent,
  refreshStudentAccessToken,
  logoutStudent,
  forgotPassword,
  resetPassword
} from '../controllers/studentController.js';
import { authenticateUser, authenticateStudent, verifySecretKey } from '../middleware/auth.js';

const router = express.Router();

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// ✅ Student Registration (requires secret key)
router.post('/register', verifySecretKey, registerStudent);

// ✅ Student Login
router.post('/login', loginStudent);

// ✅ Refresh Token
router.post('/refresh', refreshStudentAccessToken);

// ✅ Logout
router.post('/logout', authenticateStudent, logoutStudent);

// ✅ Forgot Password
router.post('/forgot-password', forgotPassword);

// ✅ Reset Password
router.post('/reset-password', resetPassword);

// ============================================
// STUDENT MANAGEMENT ROUTES
// ============================================

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