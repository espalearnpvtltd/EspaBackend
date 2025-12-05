import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['card', 'upi', 'cash', 'other'], default: 'other' },
  status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
