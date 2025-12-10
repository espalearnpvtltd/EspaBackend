// controllers/classController.js
import Class from '../models/Class.js';

// ✅ Create Class
export const createClass = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newClass = await Class.create({ name });
    res.status(201).json({ message: 'Class created', class: newClass });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get All Classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json({ classes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Single Class
export const getClass = async (req, res) => {
  try {
    const singleClass = await Class.findById(req.params.id);
    if (!singleClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ class: singleClass });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Update Class
export const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class updated', class: updatedClass });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Delete Class
export const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
