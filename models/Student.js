import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  grade: { type: String, required: true },
  school_name: { type: String, required: true },
  parent_name: { type: String },
  parent_mobile: { type: String },
  qualification: { type: String },
  admission_date: { type: Date },
  status: { type: String, default: "active" }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
