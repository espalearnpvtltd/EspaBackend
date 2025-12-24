import Attendance from '../models/Attendance.js';
import User from '../models/User.js';

// ✅ Mark Attendance (Admin/Teacher)
export const markAttendance = async (req, res) => {
  try {
    const { studentId, date, status, remarks, courseId } = req.body;

    // Verify student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if attendance already marked for this date
    const existingAttendance = await Attendance.findOne({
      student: studentId,
      date: new Date(date).setHours(0, 0, 0, 0)
    });

    if (existingAttendance) {
      // Update existing attendance
      existingAttendance.status = status;
      existingAttendance.remarks = remarks;
      existingAttendance.markedBy = req.user._id;
      await existingAttendance.save();

      return res.status(200).json({
        message: 'Attendance updated successfully',
        attendance: existingAttendance
      });
    }

    // Create new attendance record
    const attendance = new Attendance({
      student: studentId,
      class: student.class,
      date: new Date(date),
      status,
      remarks,
      course: courseId,
      markedBy: req.user._id
    });

    await attendance.save();

    res.status(201).json({
      message: 'Attendance marked successfully',
      attendance
    });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Bulk Mark Attendance (Admin/Teacher)
export const bulkMarkAttendance = async (req, res) => {
  try {
    const { attendanceRecords, date, classId } = req.body;
    // attendanceRecords: [{ studentId, status, remarks }]

    const results = [];
    const errors = [];

    for (const record of attendanceRecords) {
      try {
        const student = await User.findById(record.studentId);
        if (!student) {
          errors.push({ studentId: record.studentId, error: 'Student not found' });
          continue;
        }

        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOneAndUpdate(
          { student: record.studentId, date: attendanceDate },
          {
            student: record.studentId,
            class: classId || student.class,
            date: attendanceDate,
            status: record.status,
            remarks: record.remarks,
            markedBy: req.user._id
          },
          { upsert: true, new: true }
        );

        results.push(attendance);
      } catch (err) {
        errors.push({ studentId: record.studentId, error: err.message });
      }
    }

    res.status(200).json({
      message: 'Bulk attendance processed',
      successful: results.length,
      failed: errors.length,
      results,
      errors
    });
  } catch (error) {
    console.error('Bulk attendance error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get Attendance by Student
export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate, month, year } = req.query;

    let dateFilter = {};

    if (startDate && endDate) {
      dateFilter = {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    } else if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0);
      dateFilter = { date: { $gte: start, $lte: end } };
    }

    const attendance = await Attendance.find({
      student: studentId,
      ...dateFilter
    })
      .populate('markedBy', 'name email')
      .populate('course', 'title')
      .sort({ date: -1 });

    // Calculate statistics
    const stats = await Attendance.getAttendancePercentage(
      studentId,
      dateFilter.date?.$gte || new Date(new Date().getFullYear(), 0, 1),
      dateFilter.date?.$lte || new Date()
    );

    res.status(200).json({
      attendance,
      statistics: stats
    });
  } catch (error) {
    console.error('Get student attendance error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get Attendance by Class
export const getClassAttendance = async (req, res) => {
  try {
    const { classId } = req.params;
    const { date } = req.query;

    const queryDate = date ? new Date(date) : new Date();
    queryDate.setHours(0, 0, 0, 0);

    const attendance = await Attendance.find({
      class: classId,
      date: queryDate
    })
      .populate('student', 'name email')
      .populate('markedBy', 'name')
      .sort({ 'student.name': 1 });

    // Get all students in class for comparison
    const allStudents = await User.find({ class: classId, role: 'student' }).select('name email');

    const markedStudentIds = attendance.map(a => a.student._id.toString());
    const unmarkedStudents = allStudents.filter(s => !markedStudentIds.includes(s._id.toString()));

    res.status(200).json({
      date: queryDate,
      class: classId,
      attendance,
      unmarkedStudents,
      summary: {
        total: allStudents.length,
        marked: attendance.length,
        present: attendance.filter(a => a.status === 'present').length,
        absent: attendance.filter(a => a.status === 'absent').length,
        late: attendance.filter(a => a.status === 'late').length,
        excused: attendance.filter(a => a.status === 'excused').length
      }
    });
  } catch (error) {
    console.error('Get class attendance error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get Attendance Report
export const getAttendanceReport = async (req, res) => {
  try {
    const { classId, startDate, endDate } = req.query;

    const matchQuery = {};
    if (classId) matchQuery.class = classId;
    if (startDate && endDate) {
      matchQuery.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const report = await Attendance.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$student',
          totalDays: { $sum: 1 },
          presentDays: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absentDays: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          lateDays: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
          excusedDays: { $sum: { $cond: [{ $eq: ['$status', 'excused'] }, 1, 0] } }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'studentInfo'
        }
      },
      {
        $project: {
          student: { $arrayElemAt: ['$studentInfo', 0] },
          totalDays: 1,
          presentDays: 1,
          absentDays: 1,
          lateDays: 1,
          excusedDays: 1,
          attendancePercentage: {
            $multiply: [
              { $divide: [{ $add: ['$presentDays', '$lateDays'] }, '$totalDays'] },
              100
            ]
          }
        }
      },
      { $sort: { attendancePercentage: -1 } }
    ]);

    res.status(200).json({ report });
  } catch (error) {
    console.error('Get attendance report error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Update Attendance
export const updateAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { status, remarks } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { status, remarks, markedBy: req.user._id },
      { new: true }
    ).populate('student', 'name email');

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json({
      message: 'Attendance updated successfully',
      attendance
    });
  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Delete Attendance
export const deleteAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;

    const attendance = await Attendance.findByIdAndDelete(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    console.error('Delete attendance error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
