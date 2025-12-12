import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

// ✅ Create Indexes for Better Query Performance
// Single field indexes for common searches
classSchema.index({ name: 1 });

// Index for timestamp-based queries
classSchema.index({ createdAt: -1 });

export default mongoose.model('Class', classSchema);
