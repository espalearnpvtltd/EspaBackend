import Teacher from '../models/Teacher.js';

// ✅ Create Teacher
export const createTeacher = async (req, res) => {
  try {
    const { name, email, password, status } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, Email, and Password are required' });
    }

    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const teacher = await Teacher.create({
      name,
      email,
      password,
      status: status || 'active',
      attendance: 0
    });

    res.status(201).json({ message: 'Teacher created successfully', teacher });
  } catch (error) {
    console.error('Create Teacher Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get All Teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ teachers });
  } catch (error) {
    console.error('Get All Teachers Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Single Teacher
export const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    res.status(200).json({ teacher });
  } catch (error) {
    console.error('Get Teacher Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Update Teacher
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    res.status(200).json({ message: 'Teacher updated successfully', teacher });
  } catch (error) {
    console.error('Update Teacher Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Delete Teacher
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Delete Teacher Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Mark Attendance
export const markTeacherAttendance = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    teacher.attendance = (teacher.attendance || 0) + 1;
    await teacher.save();

    res.status(200).json({ message: 'Attendance updated', attendance: teacher.attendance });
  } catch (error) {
    console.error('Mark Teacher Attendance Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
