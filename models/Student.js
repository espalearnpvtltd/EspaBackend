import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  class: { type: String, required: true },
  token: { type: String },
  refreshToken: { type: String },
  parentsName: { type: String },
  parentsPhone: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

// ✅ Create Indexes for Better Query Performance
// Single field indexes for common searches
studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ class: 1 });
studentSchema.index({ status: 1 });

// Compound indexes for frequently combined searches
studentSchema.index({ class: 1, status: 1 });

// Index for timestamp-based queries
studentSchema.index({ createdAt: -1 });

// Sparse indexes for optional fields
studentSchema.index({ token: 1 }, { sparse: true });
studentSchema.index({ refreshToken: 1 }, { sparse: true });
studentSchema.index({ resetPasswordToken: 1 }, { sparse: true });

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('✅ Password hashed for student:', this.email);
  } catch (err) {
    console.error('Password hashing error:', err);
    return next(err);
  }
  next();
});

// Compare password for login
studentSchema.methods.comparePassword = async function(password) {
  try {
    console.log('Comparing password for student:', this.email);
    const match = await bcrypt.compare(password, this.password);
    console.log('Password match result:', match);
    return match;
  } catch (err) {
    console.error('Error comparing password:', err);
    throw err;
  }
};

export default mongoose.model('Student', studentSchema);
