import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// ✅ Register
router.post('/register', registerUser);

// ✅ Login
router.post('/login', loginUser);

// ✅ Test route
router.get('/test', (req, res) => {
  res.json({ message: '✅ Auth route working' });
});

export default router;
