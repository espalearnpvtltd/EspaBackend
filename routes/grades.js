import express from 'express';
import { authenticateUser, authorizeRoles } from '../middleware/auth.js';
import {
  addGrade,
  bulkAddGrades,
  getStudentGrades,
  getClassGrades,
  getReportCard,
  updateGrade,
  deleteGrade,
  getLeaderboard
} from '../controllers/gradeController.js';

const router = express.Router();

// All grade routes require authentication
router.use(authenticateUser);

// ✅ Add Grade (Admin/Teacher only)
router.post('/', authorizeRoles('admin', 'superadmin', 'teacher'), addGrade);

// ✅ Bulk Add Grades (Admin/Teacher only)
router.post('/bulk', authorizeRoles('admin', 'superadmin', 'teacher'), bulkAddGrades);

// ✅ Get Student Grades (Students can view their own, Admin/Teacher can view all)
router.get('/student/:studentId', getStudentGrades);

// ✅ Get Class Grades (Admin/Teacher only)
router.get('/class/:classId', authorizeRoles('admin', 'superadmin', 'teacher'), getClassGrades);

// ✅ Get Report Card
router.get('/report-card/:studentId', getReportCard);

// ✅ Get Leaderboard
router.get('/leaderboard', getLeaderboard);

// ✅ Update Grade (Admin/Teacher only)
router.put('/:gradeId', authorizeRoles('admin', 'superadmin', 'teacher'), updateGrade);

// ✅ Delete Grade (Admin only)
router.delete('/:gradeId', authorizeRoles('admin', 'superadmin'), deleteGrade);

export default router;
