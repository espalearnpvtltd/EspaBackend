import Student from '../models/Student.js';
import jwt from 'jsonwebtoken';

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
