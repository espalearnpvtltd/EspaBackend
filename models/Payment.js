import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  method: {
    type: String,
    enum: ['card', 'upi', 'cash', 'credit_card', 'debit_card', 'net_banking', 'wallet', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled', 'paid'],
    default: 'pending'
  },
  paymentGateway: {
    type: String,
    enum: ['razorpay', 'stripe', 'paypal', 'manual', 'other'],
    default: 'razorpay'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  orderId: {
    type: String,
    unique: true,
    sparse: true
  },
  paymentDate: {
    type: Date,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  },
  refundDate: {
    type: Date,
    default: null
  },
  refundAmount: {
    type: Number,
    default: 0
  },
  failureReason: {
    type: String,
    default: null
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  notes: {
    type: String,
    default: null
  }
}, { timestamps: true });

// ✅ Create Indexes for Better Query Performance
// Single field indexes for common searches
paymentSchema.index({ userId: 1 });
paymentSchema.index({ courseId: 1 });
paymentSchema.index({ studentId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ method: 1 });
paymentSchema.index({ transactionId: 1 }, { sparse: true });
paymentSchema.index({ orderId: 1 }, { sparse: true });

// Compound indexes for frequently combined searches
paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ courseId: 1, status: 1 });
paymentSchema.index({ studentId: 1, status: 1 });
paymentSchema.index({ status: 1, date: -1 });

// Index for timestamp-based queries
paymentSchema.index({ paymentDate: -1 });
paymentSchema.index({ date: -1 });
paymentSchema.index({ createdAt: -1 });

export default mongoose.model('Payment', paymentSchema);
