import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Course name
  description: String,
  subject: { type: String, required: true },
  class: { type: String }, // e.g., "10", "11", "12"
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  price: { type: Number, default: 0 }, // Course price in INR
  discountedPrice: { type: Number }, // Price after discount
  duration: { type: Number }, // in hours
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filepath: { type: String },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  pictures: [{ type: String }],
  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 },
    reviews: [{
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }]
  },
  isRecommended: { type: Boolean, default: false }
}, { timestamps: true });

// ✅ Create Indexes for Better Query Performance
// Single field indexes for common searches
courseSchema.index({ name: 1 });
courseSchema.index({ subject: 1 });
courseSchema.index({ class: 1 });
courseSchema.index({ isRecommended: 1 });
courseSchema.index({ teacherId: 1 });

// Compound indexes for frequently combined searches
courseSchema.index({ class: 1, isRecommended: 1 });
courseSchema.index({ class: 1, subject: 1 });
courseSchema.index({ subject: 1, difficulty: 1 });
courseSchema.index({ class: 1, difficulty: 1 });

// Text indexes for full-text search across multiple fields
courseSchema.index({ 
  name: 'text', 
  description: 'text', 
  subject: 'text' 
});

// Index for sorting by ratings
courseSchema.index({ 'ratings.average': -1 });

// Index for timestamp-based queries
courseSchema.index({ createdAt: -1 });

// Sparse index for optional fields
courseSchema.index({ teacherId: 1 }, { sparse: true });
courseSchema.index({ discountedPrice: 1 }, { sparse: true });

export default mongoose.model('Course', courseSchema);
