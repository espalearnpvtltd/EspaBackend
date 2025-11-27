import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  course_title: { type: String, required: true },
  course_description: { type: String },
  course_price: { type: Number, required: true },
  grade: { type: String, required: true },
  subject: { type: String, required: true },
  modules: { type: Array, default: [] },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
