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
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

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
