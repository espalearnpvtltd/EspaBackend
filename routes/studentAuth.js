import express from 'express';
import {
  registerStudent,
  loginStudent,
  refreshStudentAccessToken,
  logoutStudent,
  forgotPassword,
  resetPassword
} from '../controllers/studentAuthController.js';
import { authenticateStudent } from '../middleware/auth.js';

const router = express.Router();

// ✅ Student Registration (requires secret key)
router.post('/register', registerStudent);

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

export default router;
