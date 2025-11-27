import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subjects: { type: [String], required: true },
  salary: { type: Number },
  schedule: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);
