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

const router = express.Router();

// ✅ Create Student
router.post('/', createStudent);

// ✅ Get All Students
router.get('/', getAllStudents);

// ✅ Get Single Student
router.get('/:id', getStudent);

// ✅ Update Student
router.put('/:id', updateStudent);

// ✅ Delete Student
router.delete('/:id', deleteStudent);

// ✅ Attendance
router.post('/:id/attendance', markAttendance);

export default router;
