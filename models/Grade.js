import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  class: { 
    type: String, 
    enum: ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    required: true 
  },
  examType: { 
    type: String, 
    enum: ['quiz', 'assignment', 'midterm', 'final', 'project', 'classwork', 'homework', 'practical'],
    required: true 
  },
  examName: { 
    type: String, 
    required: true 
  },
  maxMarks: { 
    type: Number, 
    required: true,
    min: 0
  },
  obtainedMarks: { 
    type: Number, 
    required: true,
    min: 0
  },
  percentage: { 
    type: Number 
  },
  grade: { 
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F', 'N/A']
  },
  remarks: { type: String },
  gradedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  examDate: { 
    type: Date, 
    required: true 
  },
  term: {
    type: String,
    enum: ['term1', 'term2', 'term3', 'annual'],
    default: 'term1'
  }
}, { timestamps: true });

// Indexes for efficient queries
gradeSchema.index({ student: 1, course: 1, examType: 1 });
gradeSchema.index({ student: 1 });
gradeSchema.index({ course: 1 });
gradeSchema.index({ class: 1 });
gradeSchema.index({ examType: 1 });
gradeSchema.index({ examDate: -1 });
gradeSchema.index({ gradedBy: 1 });
gradeSchema.index({ term: 1 });

// Calculate percentage and grade before saving
gradeSchema.pre('save', function(next) {
  // Calculate percentage
  this.percentage = ((this.obtainedMarks / this.maxMarks) * 100).toFixed(2);
  
  // Calculate grade based on percentage
  const pct = parseFloat(this.percentage);
  if (pct >= 90) this.grade = 'A+';
  else if (pct >= 80) this.grade = 'A';
  else if (pct >= 70) this.grade = 'B+';
  else if (pct >= 60) this.grade = 'B';
  else if (pct >= 50) this.grade = 'C+';
  else if (pct >= 40) this.grade = 'C';
  else if (pct >= 33) this.grade = 'D';
  else this.grade = 'F';
  
  next();
});

// Static method to get student's overall performance
gradeSchema.statics.getStudentPerformance = async function(studentId, term = null) {
  const matchQuery = { student: new mongoose.Types.ObjectId(studentId) };
  if (term) matchQuery.term = term;

  const result = await this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: '$course',
        totalMaxMarks: { $sum: '$maxMarks' },
        totalObtainedMarks: { $sum: '$obtainedMarks' },
        examCount: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'courseDetails'
      }
    },
    {
      $project: {
        course: { $arrayElemAt: ['$courseDetails', 0] },
        totalMaxMarks: 1,
        totalObtainedMarks: 1,
        examCount: 1,
        percentage: {
          $multiply: [{ $divide: ['$totalObtainedMarks', '$totalMaxMarks'] }, 100]
        }
      }
    }
  ]);

  return result;
};

// Static method to get class performance summary
gradeSchema.statics.getClassPerformance = async function(classId, courseId = null, term = null) {
  const matchQuery = { class: classId };
  if (courseId) matchQuery.course = new mongoose.Types.ObjectId(courseId);
  if (term) matchQuery.term = term;

  const result = await this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: '$student',
        totalMaxMarks: { $sum: '$maxMarks' },
        totalObtainedMarks: { $sum: '$obtainedMarks' }
      }
    },
    {
      $project: {
        percentage: {
          $multiply: [{ $divide: ['$totalObtainedMarks', '$totalMaxMarks'] }, 100]
        }
      }
    },
    {
      $group: {
        _id: null,
        avgPercentage: { $avg: '$percentage' },
        highestPercentage: { $max: '$percentage' },
        lowestPercentage: { $min: '$percentage' },
        totalStudents: { $sum: 1 }
      }
    }
  ]);

  return result[0] || { avgPercentage: 0, highestPercentage: 0, lowestPercentage: 0, totalStudents: 0 };
};

export default mongoose.model('Grade', gradeSchema);
