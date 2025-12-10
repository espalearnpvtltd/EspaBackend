import User from '../models/User.js';
import jwt from 'jsonwebtoken';

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
