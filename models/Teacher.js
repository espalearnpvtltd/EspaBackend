import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

// ✅ Create Indexes for Better Query Performance
// Single field indexes for common searches
teacherSchema.index({ email: 1 }, { unique: true });
teacherSchema.index({ status: 1 });

// Index for timestamp-based queries
teacherSchema.index({ createdAt: -1 });

export default mongoose.model('Teacher', teacherSchema);
