import Student from '../models/Student.js';

// ✅ Create Student
export const createStudent = async (req, res) => {
  try {
    const { name, email, class: studentClass, teacherId } = req.body;

    if (!name || !email || !studentClass) {
      return res.status(400).json({ message: 'Name, Email and Class are required' });
    }

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const student = await Student.create({
      name,
      email,
      class: studentClass,
      teacherId,
      status: 'active'
    });

    res.status(201).json({ message: 'Student created successfully', student });
  } catch (error) {
    console.error('Create Student Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get All Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('teacherId', 'name email');
    res.status(200).json({ students });
  } catch (error) {
    console.error('Get All Students Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Single Student
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('teacherId', 'name email');

    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ student });
  } catch (error) {
    console.error('Get Student Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Update Student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Update Student Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Delete Student
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

// ✅ Mark Attendance
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
