import express from 'express';
import {
  getUserEnrollments,
  getEnrollmentDetails,
  updateProgress,
  rateEnrollment,
  pauseEnrollment,
  resumeEnrollment,
  cancelEnrollment,
  getMyCourses,
  getCoursesByClass
} from '../controllers/enrollmentController.js';
import { quickEnroll } from '../controllers/paymentController.js';
import { authenticateStudent } from '../middleware/auth.js';

const router = express.Router();

// ✅ Enrollment Routes (Auth Required)
router.post('/quick', authenticateStudent, quickEnroll);               // Direct enroll without gateway
router.get('/', authenticateStudent, getUserEnrollments);               // Get all enrollments
router.get('/my-courses', authenticateStudent, getMyCourses);           // Get my enrolled courses with full details (MUST BE BEFORE :enrollmentId route)
router.get('/:enrollmentId', authenticateStudent, getEnrollmentDetails); // Get enrollment details
router.put('/:enrollmentId/progress', authenticateStudent, updateProgress); // Update progress
router.post('/:enrollmentId/rate', authenticateStudent, rateEnrollment); // Rate enrollment
router.put('/:enrollmentId/pause', authenticateStudent, pauseEnrollment); // Pause enrollment
router.put('/:enrollmentId/resume', authenticateStudent, resumeEnrollment); // Resume enrollment
router.put('/:enrollmentId/cancel', authenticateStudent, cancelEnrollment); // Cancel enrollment

// ✅ Courses by Class (Public)
router.get('/courses/class/:classLevel', getCoursesByClass);            // Get courses by class level

export default router;
