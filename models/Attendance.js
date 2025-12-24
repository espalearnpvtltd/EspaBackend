import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  class: { 
    type: String, 
    enum: ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['present', 'absent', 'late', 'excused'], 
    required: true,
    default: 'present'
  },
  markedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  remarks: { type: String },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course' 
  }
}, { timestamps: true });

// Indexes for efficient queries
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });
attendanceSchema.index({ class: 1, date: 1 });
attendanceSchema.index({ student: 1 });
attendanceSchema.index({ date: -1 });
attendanceSchema.index({ status: 1 });
attendanceSchema.index({ markedBy: 1 });

// Virtual for attendance percentage calculation
attendanceSchema.statics.getAttendancePercentage = async function(studentId, startDate, endDate) {
  const result = await this.aggregate([
    {
      $match: {
        student: new mongoose.Types.ObjectId(studentId),
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        present: {
          $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
        },
        late: {
          $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] }
        }
      }
    }
  ]);

  if (result.length === 0) return { percentage: 0, total: 0, present: 0 };
  
  const { total, present, late } = result[0];
  const percentage = ((present + late) / total) * 100;
  
  return { percentage: percentage.toFixed(2), total, present, late };
};

export default mongoose.model('Attendance', attendanceSchema);
