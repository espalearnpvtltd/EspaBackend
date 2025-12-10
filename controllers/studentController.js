import Student from '../models/Student.js';
import jwt from 'jsonwebtoken';
import { generateResetToken, hashResetToken, isTokenExpired } from '../utils/passwordReset.js';
import { sendPasswordResetEmail } from '../utils/emailService.js';

// Token generators
const generateAccessToken = (id, email) =>
  jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (id, email) =>
  jwt.sign({ id, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

// Token generator
const generateStudentToken = (id, email) =>
  jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });


export const createStudent = async (req, res) => {
  try {
    const { name, email, password, class: studentClass, parentsName, parentsPhone } = req.body;

    if (!name || !email || !password || !studentClass) {
      return res.status(400).json({ message: 'Name, Email, Password and Class are required' });
    }

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Generate token for student
    const token = generateStudentToken(email, name);

    const student = await Student.create({
      name,
      email,
      password,
      class: studentClass,
      token,
      parentsName,
      parentsPhone,
      status: 'active'
    });

    res.status(201).json({ message: 'Student created successfully', student });
  } catch (error) {
    console.error('Create Student Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get All Students (Authenticated - JWT required)
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password -refreshToken');
    res.status(200).json({ students });
  } catch (error) {
    console.error('Get All Students Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Single Student (Authenticated - JWT required)
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password -refreshToken');

    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ student });
  } catch (error) {
    console.error('Get Student Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Update Student (Authenticated - JWT required)
export const updateStudent = async (req, res) => {
  try {
    // Don't allow password update here
    const { password, ...updateData } = req.body;

    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password -refreshToken');

    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Update Student Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Delete Student (Authenticated - JWT required)
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete Student Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Mark Attendance (Authenticated - JWT required)
export const markAttendance = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.attendance = (student.attendance || 0) + 1;
    await student.save();

    res.status(200).json({ message: 'Attendance updated', attendance: student.attendance });
  } catch (error) {
    console.error('Mark Attendance Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ============================================
// STUDENT REGISTRATION
// ============================================
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, class: studentClass, parentsName, parentsPhone } = req.body;

    if (!name || !email || !password || !studentClass) {
      return res.status(400).json({ message: 'Name, email, password, and class are required' });
    }

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const student = await Student.create({
      name,
      email,
      password,
      class: studentClass,
      parentsName,
      parentsPhone,
      status: 'active'
    });

    const accessToken = generateAccessToken(student._id, student.email);
    const refreshToken = generateRefreshToken(student._id, student.email);

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

    const student = await Student.findOne({ email });
    if (!student) {
      console.error('Student not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

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

    if (student.status !== 'active') {
      return res.status(403).json({ message: 'Student is inactive' });
    }

    const accessToken = generateAccessToken(student._id, student.email);
    const refreshToken = generateRefreshToken(student._id, student.email);

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
// REFRESH TOKEN
// ============================================
export const refreshStudentAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const student = await Student.findById(decoded.id);

    if (!student || student.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    const newAccessToken = generateAccessToken(student._id, student.email);
    const newRefreshToken = generateRefreshToken(student._id, student.email);

    student.token = newAccessToken;
    student.refreshToken = newRefreshToken;
    await student.save();

    res.status(200).json({
      message: 'Token refreshed ✅',
      tokens: {
        access: newAccessToken,
        refresh: newRefreshToken
      }
    });
  } catch (err) {
    console.error('Refresh Token Error:', err);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

// ============================================
// LOGOUT
// ============================================
export const logoutStudent = async (req, res) => {
  try {
    const studentId = req.user.id;

    await Student.findByIdAndUpdate(studentId, { 
      refreshToken: null,
      token: null 
    });

    res.status(200).json({ message: 'Logout successful ✅' });
  } catch (err) {
    console.error('Logout Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ============================================
// FORGOT PASSWORD (Send Email)
// ============================================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(200).json({ message: 'If email exists, reset link will be sent ✅' });
    }

    const resetToken = generateResetToken();
    const hashedToken = hashResetToken(resetToken);

    student.resetPasswordToken = hashedToken;
    student.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    await student.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&secret=${process.env.PASSWORD_RESET_SECRET}`;

    try {
      await sendPasswordResetEmail(student.email, student.name, resetUrl);
      console.log('✅ Password reset email sent to:', email);
    } catch (emailErr) {
      console.error('❌ Email sending failed:', emailErr.message);
      student.resetPasswordToken = null;
      student.resetPasswordExpire = null;
      await student.save();
      return res.status(500).json({ message: 'Failed to send reset email' });
    }

    res.status(200).json({
      message: 'Password reset link sent to email ✅'
    });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ============================================
// RESET PASSWORD
// ============================================
export const resetPassword = async (req, res) => {
  try {
    const { token, secret, newPassword, confirmPassword } = req.body;

    if (!secret || secret !== process.env.PASSWORD_RESET_SECRET) {
      return res.status(403).json({ message: 'Invalid secret key' });
    }

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Token and passwords are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const hashedToken = hashResetToken(token);

    const student = await Student.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: new Date() }
    });

    if (!student) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    if (isTokenExpired(student.resetPasswordExpire)) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    student.password = newPassword;
    student.resetPasswordToken = null;
    student.resetPasswordExpire = null;
    await student.save();

    console.log('✅ Password reset successfully for:', student.email);

    res.status(200).json({
      message: 'Password reset successful ✅. Please login with your new password.',
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
