import express from 'express';
import { authenticateUser, authorizeRoles } from '../middleware/auth.js';
import {
  markAttendance,
  bulkMarkAttendance,
  getStudentAttendance,
  getClassAttendance,
  getAttendanceReport,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();

// All attendance routes require authentication
router.use(authenticateUser);

// ✅ Mark Attendance (Admin/Teacher only)
router.post('/mark', authorizeRoles('admin', 'superadmin', 'teacher'), markAttendance);

// ✅ Bulk Mark Attendance (Admin/Teacher only)
router.post('/bulk-mark', authorizeRoles('admin', 'superadmin', 'teacher'), bulkMarkAttendance);

// ✅ Get Student Attendance (Students can view their own, Admin/Teacher can view all)
router.get('/student/:studentId', getStudentAttendance);

// ✅ Get Class Attendance (Admin/Teacher only)
router.get('/class/:classId', authorizeRoles('admin', 'superadmin', 'teacher'), getClassAttendance);

// ✅ Get Attendance Report (Admin/Teacher only)
router.get('/report', authorizeRoles('admin', 'superadmin', 'teacher'), getAttendanceReport);

// ✅ Update Attendance (Admin/Teacher only)
router.put('/:attendanceId', authorizeRoles('admin', 'superadmin', 'teacher'), updateAttendance);

// ✅ Delete Attendance (Admin only)
router.delete('/:attendanceId', authorizeRoles('admin', 'superadmin'), deleteAttendance);

export default router;
