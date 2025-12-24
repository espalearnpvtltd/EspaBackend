import Grade from '../models/Grade.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

// ✅ Add Grade (Admin/Teacher)
export const addGrade = async (req, res) => {
  try {
    const { 
      studentId, courseId, examType, examName, 
      maxMarks, obtainedMarks, remarks, examDate, term 
    } = req.body;

    // Verify student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Validate marks
    if (obtainedMarks > maxMarks) {
      return res.status(400).json({ message: 'Obtained marks cannot exceed maximum marks' });
    }

    const grade = new Grade({
      student: studentId,
      course: courseId,
      class: student.class,
      examType,
      examName,
      maxMarks,
      obtainedMarks,
      remarks,
      examDate: new Date(examDate),
      term,
      gradedBy: req.user._id
    });

    await grade.save();

    res.status(201).json({
      message: 'Grade added successfully',
      grade
    });
  } catch (error) {
    console.error('Add grade error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Bulk Add Grades (Admin/Teacher)
export const bulkAddGrades = async (req, res) => {
  try {
    const { grades, courseId, examType, examName, maxMarks, examDate, term } = req.body;
    // grades: [{ studentId, obtainedMarks, remarks }]

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const results = [];
    const errors = [];

    for (const gradeData of grades) {
      try {
        const student = await User.findById(gradeData.studentId);
        if (!student) {
          errors.push({ studentId: gradeData.studentId, error: 'Student not found' });
          continue;
        }

        if (gradeData.obtainedMarks > maxMarks) {
          errors.push({ studentId: gradeData.studentId, error: 'Obtained marks exceed maximum' });
          continue;
        }

        const grade = new Grade({
          student: gradeData.studentId,
          course: courseId,
          class: student.class,
          examType,
          examName,
          maxMarks,
          obtainedMarks: gradeData.obtainedMarks,
          remarks: gradeData.remarks,
          examDate: new Date(examDate),
          term,
          gradedBy: req.user._id
        });

        await grade.save();
        results.push(grade);
      } catch (err) {
        errors.push({ studentId: gradeData.studentId, error: err.message });
      }
    }

    res.status(200).json({
      message: 'Bulk grades processed',
      successful: results.length,
      failed: errors.length,
      results,
      errors
    });
  } catch (error) {
    console.error('Bulk add grades error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get Student Grades
export const getStudentGrades = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { courseId, term, examType } = req.query;

    const filter = { student: studentId };
    if (courseId) filter.course = courseId;
    if (term) filter.term = term;
    if (examType) filter.examType = examType;

    const grades = await Grade.find(filter)
      .populate('course', 'title subject')
      .populate('gradedBy', 'name')
      .sort({ examDate: -1 });

    // Get performance summary
    const performance = await Grade.getStudentPerformance(studentId, term);

    // Calculate overall stats
    const totalMaxMarks = grades.reduce((sum, g) => sum + g.maxMarks, 0);
    const totalObtainedMarks = grades.reduce((sum, g) => sum + g.obtainedMarks, 0);
    const overallPercentage = totalMaxMarks > 0 ? ((totalObtainedMarks / totalMaxMarks) * 100).toFixed(2) : 0;

    res.status(200).json({
      grades,
      performance,
      summary: {
        totalExams: grades.length,
        totalMaxMarks,
        totalObtainedMarks,
        overallPercentage
      }
    });
  } catch (error) {
    console.error('Get student grades error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get Class Grades
export const getClassGrades = async (req, res) => {
  try {
    const { classId } = req.params;
    const { courseId, term, examType, examName } = req.query;

    const filter = { class: classId };
    if (courseId) filter.course = courseId;
    if (term) filter.term = term;
    if (examType) filter.examType = examType;
    if (examName) filter.examName = examName;

    const grades = await Grade.find(filter)
      .populate('student', 'name email')
      .populate('course', 'title subject')
      .sort({ 'student.name': 1 });

    // Get class performance summary
    const classPerformance = await Grade.getClassPerformance(classId, courseId, term);

    res.status(200).json({
      grades,
      classPerformance
    });
  } catch (error) {
    console.error('Get class grades error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get Grade Report Card
export const getReportCard = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { term } = req.query;

    const student = await User.findById(studentId).select('name email class');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const filter = { student: studentId };
    if (term) filter.term = term;

    // Group grades by course
    const gradesByCourse = await Grade.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$course',
          exams: {
            $push: {
              examType: '$examType',
              examName: '$examName',
              maxMarks: '$maxMarks',
              obtainedMarks: '$obtainedMarks',
              percentage: '$percentage',
              grade: '$grade',
              examDate: '$examDate'
            }
          },
          totalMaxMarks: { $sum: '$maxMarks' },
          totalObtainedMarks: { $sum: '$obtainedMarks' }
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
          exams: 1,
          totalMaxMarks: 1,
          totalObtainedMarks: 1,
          coursePercentage: {
            $multiply: [{ $divide: ['$totalObtainedMarks', '$totalMaxMarks'] }, 100]
          }
        }
      }
    ]);

    // Calculate overall performance
    const totalMax = gradesByCourse.reduce((sum, c) => sum + c.totalMaxMarks, 0);
    const totalObtained = gradesByCourse.reduce((sum, c) => sum + c.totalObtainedMarks, 0);
    const overallPercentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : 0;

    // Determine overall grade
    let overallGrade;
    const pct = parseFloat(overallPercentage);
    if (pct >= 90) overallGrade = 'A+';
    else if (pct >= 80) overallGrade = 'A';
    else if (pct >= 70) overallGrade = 'B+';
    else if (pct >= 60) overallGrade = 'B';
    else if (pct >= 50) overallGrade = 'C+';
    else if (pct >= 40) overallGrade = 'C';
    else if (pct >= 33) overallGrade = 'D';
    else overallGrade = 'F';

    res.status(200).json({
      student,
      term: term || 'All Terms',
      subjects: gradesByCourse,
      overall: {
        totalMaxMarks: totalMax,
        totalObtainedMarks: totalObtained,
        percentage: overallPercentage,
        grade: overallGrade
      }
    });
  } catch (error) {
    console.error('Get report card error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Update Grade
export const updateGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const { obtainedMarks, maxMarks, remarks } = req.body;

    const grade = await Grade.findById(gradeId);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    if (maxMarks) grade.maxMarks = maxMarks;
    if (obtainedMarks !== undefined) grade.obtainedMarks = obtainedMarks;
    if (remarks) grade.remarks = remarks;
    grade.gradedBy = req.user._id;

    await grade.save(); // This will trigger the pre-save hook to recalculate percentage and grade

    res.status(200).json({
      message: 'Grade updated successfully',
      grade
    });
  } catch (error) {
    console.error('Update grade error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Delete Grade
export const deleteGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;

    const grade = await Grade.findByIdAndDelete(gradeId);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    res.status(200).json({ message: 'Grade deleted successfully' });
  } catch (error) {
    console.error('Delete grade error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const { classId, courseId, term, limit = 10 } = req.query;

    const matchQuery = {};
    if (classId) matchQuery.class = classId;
    if (courseId) matchQuery.course = courseId;
    if (term) matchQuery.term = term;

    const leaderboard = await Grade.aggregate([
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
          },
          totalMaxMarks: 1,
          totalObtainedMarks: 1
        }
      },
      { $sort: { percentage: -1 } },
      { $limit: parseInt(limit) },
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
          percentage: 1,
          totalMaxMarks: 1,
          totalObtainedMarks: 1
        }
      }
    ]);

    // Add rank
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      student: {
        _id: entry.student._id,
        name: entry.student.name,
        class: entry.student.class
      },
      percentage: entry.percentage.toFixed(2),
      totalMaxMarks: entry.totalMaxMarks,
      totalObtainedMarks: entry.totalObtainedMarks
    }));

    res.status(200).json({ leaderboard: rankedLeaderboard });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
