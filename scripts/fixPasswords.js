import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI);
console.log('✅ Connected to MongoDB');

// Import models
import User from './models/User.js';
import Student from './models/Student.js';

// Fix function for hashing passwords
const fixPasswords = async () => {
  try {
    // Fix Users
    const users = await User.find({});
    console.log(`Found ${users.length} users to check...`);
    
    for (let user of users) {
      // Check if password is already hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
      if (!user.password.startsWith('$2')) {
        console.log(`Hashing password for user: ${user.email}`);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        console.log(`✅ Fixed user: ${user.email}`);
      }
    }

    // Fix Students
    const students = await Student.find({});
    console.log(`Found ${students.length} students to check...`);
    
    for (let student of students) {
      // Check if password is already hashed
      if (!student.password.startsWith('$2')) {
        console.log(`Hashing password for student: ${student.email}`);
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(student.password, salt);
        await student.save();
        console.log(`✅ Fixed student: ${student.email}`);
      }
    }

    console.log('✅ All passwords fixed!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

fixPasswords();
