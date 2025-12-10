import express from 'express';
import {
  registerStudent,
  loginStudent,
  refreshStudentAccessToken,
  logoutStudent
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

export default router;
