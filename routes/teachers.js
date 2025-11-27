// routes/teachers.js
import express from "express";
import Teacher from "../models/Teacher.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE a new Teacher (Protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all Teachers (Protected)
router.get("/", verifyToken, async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single Teacher by ID (Protected)
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a Teacher by ID (Protected)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(updatedTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a Teacher by ID (Protected)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
