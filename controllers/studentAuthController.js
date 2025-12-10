import Student from '../models/Student.js';
import jwt from 'jsonwebtoken';
import { generateResetToken, hashResetToken, isTokenExpired } from '../utils/passwordReset.js';

// Token generators
const generateAccessToken = (id, email) =>
  jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (id, email) =>
  jwt.sign({ id, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

// ============================================
// STUDENT REGISTRATION (with secret key)
// ============================================
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, class: studentClass, parentsName, parentsPhone } = req.body;

    // Validate required fields
    if (!name || !email || !password || !studentClass) {
      return res.status(400).json({ message: 'Name, email, password, and class are required' });
    }

    // Check if student already exists
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Create new student
    const student = await Student.create({
      name,
      email,
      password,
      class: studentClass,
      parentsName,
      parentsPhone,
      status: 'active'
    });

    // Generate tokens
    const accessToken = generateAccessToken(student._id, student.email);
    const refreshToken = generateRefreshToken(student._id, student.email);

    // Save refresh token and access token to DB
    student.token = accessToken;
    student.refreshToken = refreshToken;
    await student.save();

    res.status(201).json({
      message: 'Student registered successfully ✅',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        class: student.class,
        parentsName: student.parentsName,
        parentsPhone: student.parentsPhone,
        status: student.status
      },
      tokens: {
        access: accessToken,
        refresh: refreshToken
      }
    });
  } catch (err) {
    console.error('Register Student Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ============================================
// STUDENT LOGIN
// ============================================
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find student
    const student = await Student.findOne({ email });
    if (!student) {
      console.error('Student not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    let isMatch = false;
    try {
      isMatch = await student.comparePassword(password);
    } catch (err) {
      console.error('Password comparison error:', err);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!isMatch) {
      console.error('Password mismatch for student:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check status
    if (student.status !== 'active') {
      return res.status(403).json({ message: 'Student is inactive' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(student._id, student.email);
    const refreshToken = generateRefreshToken(student._id, student.email);

    // Save tokens to DB
    student.token = accessToken;
    student.refreshToken = refreshToken;
    await student.save();

    res.status(200).json({
      message: 'Login successful ✅',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        class: student.class,
        parentsName: student.parentsName,
        parentsPhone: student.parentsPhone,
        status: student.status
      },
      tokens: {
        access: accessToken,
        refresh: refreshToken
      }
    });
  } catch (err) {
    console.error('Login Student Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ============================================
// REFRESH TOKEN (for Students)
// ============================================
export const refreshStudentAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Find student
    const student = await Student.findById(decoded.id);
    if (!student || student.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new access token
    const accessToken = generateAccessToken(student._id, student.email);

    res.status(200).json({
      message: 'Token refreshed ✅',
      tokens: {
        access: accessToken,
        refresh: refreshToken
      }
    });
  } catch (err) {
    console.error('Refresh Token Error:', err);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

// ============================================
// LOGOUT (for Students)
// ============================================
export const logoutStudent = async (req, res) => {
  try {
    const studentId = req.student.id;

    // Clear tokens
    await Student.findByIdAndUpdate(studentId, { token: null, refreshToken: null });

    res.status(200).json({ message: 'Logout successful ✅' });
  } catch (err) {
    console.error('Logout Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ============================================
// FORGOT PASSWORD (for Students)
// ============================================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find student
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const hashedToken = hashResetToken(resetToken);

    // Save hashed token and expiration to DB (token expires in 15 minutes)
    student.resetPasswordToken = hashedToken;
    student.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    await student.save();

    console.log('🔐 Password reset token generated for:', email);

    res.status(200).json({
      message: 'Password reset link sent to email ✅',
      resetToken: resetToken,
      resetUrl: `http://localhost:3000/reset-password?token=${resetToken}`
    });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ============================================
// RESET PASSWORD (for Students)
// ============================================
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Token and passwords are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Hash the token to match with DB
    const hashedToken = hashResetToken(token);

    // Find student with reset token
    const student = await Student.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: new Date() }
    });

    if (!student) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Check if token is expired
    if (isTokenExpired(student.resetPasswordExpire)) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    // Update password
    student.password = newPassword;
    student.resetPasswordToken = null;
    student.resetPasswordExpire = null;
    await student.save();

    console.log('✅ Password reset successfully for:', student.email);

    res.status(200).json({
      message: 'Password reset successful ✅',
      student: {
        id: student._id,
        name: student.name,
        email: student.email
      }
    });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

