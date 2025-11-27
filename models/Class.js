import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    class_name: { type: String, required: true },       // e.g., "Grade 6"
    class_code: { type: String, required: true, unique: true }, // unique identifier
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // reference to Teacher
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // enrolled students
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model("Class", classSchema);
