import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["success", "failed", "pending"], required: true },
  gateway: { type: String, enum: ["razorpay", "cashfree"], required: true },
  date: { type: Date, default: Date.now },
  invoice_url: { type: String },
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
