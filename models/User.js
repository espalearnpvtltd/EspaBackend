import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['student', 'teacher', 'admin', 'superadmin'], default: 'student' },
  parentsName: { type: String },
  parentsPhone: { type: String },
  parentEmail: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  profileImage: { type: String },
  refreshToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('✅ Password hashed for user:', this.email);
  } catch (err) {
    console.error('Password hashing error:', err);
    return next(err);
  }
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function(password) {
  try {
    console.log('Comparing password for:', this.email);
    const match = await bcrypt.compare(password, this.password);
    console.log('Password match result:', match);
    return match;
  } catch (err) {
    console.error('Error comparing password:', err);
    throw err;
  }
};

export default mongoose.model('User', userSchema);
