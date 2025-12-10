import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import { initializeRedis } from './utils/cache.js';

dotenv.config();

const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// =====================
// Test route
// =====================
app.get('/', (req, res) => {
  res.send('🚀 Backend running successfully!');
});

// =====================
// MongoDB Connection
// =====================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// =====================
// Main Server Initialization
// =====================
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Initialize Redis Cache
    await initializeRedis();

    // =====================
    // Routes
    // =====================
    app.use('/api/auth', authRoutes);
    app.use('/api/students', studentRoutes);

    // =====================
    // Start server
    // =====================
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server startup error:', err);
    process.exit(1);
  }
};

startServer();
