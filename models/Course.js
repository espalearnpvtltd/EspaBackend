import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  subject: { type: String, required: true },
  class: { type: String }, // e.g., "10", "11", "12"
  stream: { 
    type: String, 
    enum: ['science', 'commerce', 'arts', 'general'], 
    default: 'general' 
  },
  examType: [{ 
    type: String, 
    enum: ['JEE', 'NEET', 'UPSC', 'BOARDS', 'GATE', 'CAT'] 
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
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

export default mongoose.model('Course', courseSchema);
