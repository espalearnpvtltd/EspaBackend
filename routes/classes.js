import express from "express";
import Class from "../models/Class.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE a new Class
router.post("/", verifyToken, async (req, res) => {
  try {
    const { class_name, class_code } = req.body;

    const existingClass = await Class.findOne({ class_code });
    if (existingClass) return res.status(400).json({ message: "Class already exists" });

    const newClass = new Class({ class_name, class_code });
    await newClass.save();

    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all Classes
router.get("/", verifyToken, async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("teacher_id", "name email role")
      .populate("students", "name email student_id");
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE Class by ID
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) return res.status(404).json({ message: "Class not found" });
    res.json(updatedClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ASSIGN teacher to Class
router.put("/:id/assign-teacher", verifyToken, async (req, res) => {
  try {
    const { teacher_id } = req.body;
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { teacher_id },
      { new: true }
    );
    if (!updatedClass) return res.status(404).json({ message: "Class not found" });
    res.json(updatedClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ENROLL student in Class
router.put("/:id/enroll-student", verifyToken, async (req, res) => {
  try {
    const { student_id } = req.body;
    const classToUpdate = await Class.findById(req.params.id);
    if (!classToUpdate) return res.status(404).json({ message: "Class not found" });

    if (!classToUpdate.students.includes(student_id)) {
      classToUpdate.students.push(student_id);
      await classToUpdate.save();
    }

    res.json(classToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE Class by ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
