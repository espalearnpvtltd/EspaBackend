import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Student from '../models/Student.js';

// Verify Secret Key for registration/creation endpoints
export const verifySecretKey = (req, res, next) => {
  try {
    const secretKey = req.headers['x-secret-key'];

    if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Invalid or missing secret key' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Authenticate User with JWT
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Authenticate Student with JWT (works with both Student and User models)
export const authenticateStudent = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Try to find in Student model first, then fall back to User model
    let student = await Student.findById(decoded.id).select('-password');
    if (!student) {
      student = await User.findById(decoded.id).select('-password');
    }

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    req.student = student;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    next();
  };
};
