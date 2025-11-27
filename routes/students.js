import express from "express";
import Student from "../models/Student.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// POST /api/students -> create student
router.post("/", verifyToken, async (req, res) => {
  try {
    const { student_id, grade, school_name, parent_name, parent_mobile, qualification, admission_date, status } = req.body;
    if (!student_id || !grade || !school_name) return res.status(400).json({ message: "Missing fields" });

    const exists = await Student.findOne({ student_id });
    if (exists) return res.status(409).json({ message: "Student already exists" });

    const student = await Student.create({ student_id, grade, school_name, parent_name, parent_mobile, qualification, admission_date, status: status || "active" });

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all students
router.get("/", verifyToken, async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

export default router;
