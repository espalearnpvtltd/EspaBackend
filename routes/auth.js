import express from 'express';
import { registerUser, loginUser, refreshAccessToken, logoutUser, forgotPassword, resetPassword } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// ✅ User Registration
router.post('/register', registerUser);

// ✅ User Login
router.post('/login', loginUser);

// ✅ Refresh Access Token
router.post('/refresh', refreshAccessToken);

// ✅ User Logout
router.post('/logout', authenticateUser, logoutUser);

// ✅ Forgot Password
router.post('/forgot-password', forgotPassword);

// ✅ Reset Password
router.post('/reset-password', resetPassword);

// ✅ Test route
router.get('/test', (req, res) => {
  res.json({ message: '✅ Auth route working' });
});

export default router;
