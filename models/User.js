import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  role: String,
  profile_photo: String,

  isEmailVerified: { type: Boolean, default: false },
  emailOTP: String,
  emailOTPExpires: Date,

}, { timestamps: true });

export default mongoose.model("User", userSchema);
