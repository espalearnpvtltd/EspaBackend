import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['card', 'upi', 'cash', 'other'], default: 'other' },
  status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

// ✅ Create Indexes for Better Query Performance
// Single field indexes for common searches
paymentSchema.index({ studentId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ method: 1 });

// Compound indexes for frequently combined searches
paymentSchema.index({ studentId: 1, status: 1 });
paymentSchema.index({ status: 1, date: -1 });

// Index for timestamp-based queries
paymentSchema.index({ date: -1 });
paymentSchema.index({ createdAt: -1 });

export default mongoose.model('Payment', paymentSchema);
