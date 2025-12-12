import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: false,
    default: null
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completionDate: {
    type: Date,
    default: null
  },
  certificateIssued: {
    type: Boolean,
    default: false
  },
  certificateDate: {
    type: Date,
    default: null
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  feedback: {
    type: String,
    default: null
  }
}, { timestamps: true });

// Indexes for optimized queries
enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true }); // One enrollment per student-course pair
enrollmentSchema.index({ studentId: 1 });
enrollmentSchema.index({ courseId: 1 });
enrollmentSchema.index({ paymentId: 1 });
enrollmentSchema.index({ status: 1 });
enrollmentSchema.index({ enrollmentDate: -1 });
enrollmentSchema.index({ studentId: 1, status: 1 });

export default mongoose.model('Enrollment', enrollmentSchema);
