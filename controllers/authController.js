import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateResetToken, hashResetToken, isTokenExpired } from '../utils/passwordReset.js';

// Token generators
const generateAccessToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

// ============================================
// USER REGISTRATION (with secret key)
// ============================================
export const registerUser = async (req, res) => {
  try {
    const { 
      name, email, password, role, phone, parentsName, parentsPhone, parentEmail,
      address, city, state, zipCode, dateOfBirth, gender, profileImage 
    } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'teacher',
      phone,
      parentsName,
      parentsPhone,
      parentEmail,
      address,
      city,
      state,
      zipCode,
      dateOfBirth,
      gender,
      profileImage
    });

    console.log('✅ User registered:', email);

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    // Save refresh token to DB
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      message: 'User registered successfully ✅',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        parentsName: user.parentsName,
        parentsPhone: user.parentsPhone,
        parentEmail: user.parentEmail,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        profileImage: user.profileImage,
        status: user.status
      },
      tokens: {
        access: accessToken,
        refresh: refreshToken
      }
    });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ============================================
// USER LOGIN
// ============================================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    let isMatch = false;
    try {
      isMatch = await user.comparePassword(password);
    } catch (err) {
      console.error('Password comparison error:', err);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!isMatch) {
      console.error('Password mismatch for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check status
    if (user.status !== 'active') {
      return res.status(403).json({ message: 'User is inactive' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    // Save refresh token to DB
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: 'Login successful ✅',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      },
      tokens: {
        access: accessToken,
        refresh: refreshToken
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ============================================
// REFRESH TOKEN (for Users)
// ============================================
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Find user
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new access token
    const accessToken = generateAccessToken(user._id, user.role);

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
// LOGOUT (for Users)
// ============================================
export const logoutUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Clear refresh token
    await User.findByIdAndUpdate(userId, { refreshToken: null });

    res.status(200).json({ message: 'Logout successful ✅' });
  } catch (err) {
    console.error('Logout Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ============================================
// FORGOT PASSWORD
// ============================================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const hashedToken = hashResetToken(resetToken);

    // Save hashed token and expiration to DB (token expires in 15 minutes)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    // In production, send email with reset link
    // For now, return the token (in real app, include in email)
    console.log('🔐 Password reset token generated for:', email);
    console.log('Reset token (send to user via email):', resetToken);

    res.status(200).json({
      message: 'Password reset link sent to email ✅',
      // Only for development - remove in production
      resetToken: resetToken,
      resetUrl: `http://localhost:3000/reset-password?token=${resetToken}`
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

    // Find user with reset token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Check if token is expired
    if (isTokenExpired(user.resetPasswordExpire)) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    console.log('✅ Password reset successfully for:', user.email);

    res.status(200).json({
      message: 'Password reset successful ✅',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

