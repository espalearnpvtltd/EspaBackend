import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import User from '../models/User.js';

// ✅ Get User Enrollments
export const getUserEnrollments = async (req, res) => {
  try {
    const studentId = req.student?.userId || req.student?._id;

    const enrollments = await Enrollment.find({ studentId })
      .populate('courseId', 'name subject class difficulty price discountedPrice duration pictures')
      .populate('paymentId', 'amount status transactionId paymentDate')
      .sort({ enrollmentDate: -1 });

    res.status(200).json({
      message: 'Enrollments retrieved',
      count: enrollments.length,
      enrollments: enrollments.map(e => ({
        enrollmentId: e._id,
        courseName: e.courseId.name,
        subject: e.courseId.subject,
        class: e.courseId.class,
        difficulty: e.courseId.difficulty,
        duration: e.courseId.duration,
        pictures: e.courseId.pictures,
        status: e.status,
        progress: e.progress,
        enrollmentDate: e.enrollmentDate,
        completionDate: e.completionDate,
        certificateIssued: e.certificateIssued,
        rating: e.rating,
        paymentStatus: e.paymentId?.status,
        amountPaid: e.paymentId?.amount
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching enrollments', error: error.message });
  }
};

// ✅ Get Single Enrollment
export const getEnrollmentDetails = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const studentId = req.student?.userId || req.student?._id;

    const enrollment = await Enrollment.findOne({ _id: enrollmentId, studentId })
      .populate('courseId')
      .populate('paymentId')
      .populate('userId', 'name email class');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.status(200).json({
      message: 'Enrollment details retrieved',
      enrollment: {
        enrollmentId: enrollment._id,
        courseName: enrollment.courseId.name,
        courseDescription: enrollment.courseId.description,
        subject: enrollment.courseId.subject,
        class: enrollment.courseId.class,
        difficulty: enrollment.courseId.difficulty,
        duration: enrollment.courseId.duration,
        pictures: enrollment.courseId.pictures,
        status: enrollment.status,
        progress: enrollment.progress,
        enrollmentDate: enrollment.enrollmentDate,
        completionDate: enrollment.completionDate,
        certificateIssued: enrollment.certificateIssued,
        rating: enrollment.rating,
        feedback: enrollment.feedback,
        paymentStatus: enrollment.paymentId?.status,
        amountPaid: enrollment.paymentId?.amount,
        transactionId: enrollment.paymentId?.transactionId
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching enrollment details', error: error.message });
  }
};

// ✅ Update Enrollment Progress
export const updateProgress = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { progress } = req.body;
    const studentId = req.student?.userId || req.student?._id;

    if (progress < 0 || progress > 100) {
      return res.status(400).json({ message: 'Progress must be between 0 and 100' });
    }

    const enrollment = await Enrollment.findOne({ _id: enrollmentId, studentId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.progress = progress;

    // Mark as completed if progress is 100
    if (progress === 100 && !enrollment.completionDate) {
      enrollment.status = 'completed';
      enrollment.completionDate = new Date();
    }

    await enrollment.save();

    res.status(200).json({
      message: 'Progress updated',
      enrollment: {
        enrollmentId: enrollment._id,
        progress: enrollment.progress,
        status: enrollment.status,
        completionDate: enrollment.completionDate
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
};

// ✅ Add Course Rating
export const rateEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { rating, feedback } = req.body;
    const studentId = req.student?.userId || req.student?._id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const enrollment = await Enrollment.findOne({ _id: enrollmentId, studentId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.rating = rating;
    if (feedback) enrollment.feedback = feedback;
    await enrollment.save();

    res.status(200).json({
      message: 'Rating added successfully',
      enrollment: {
        enrollmentId: enrollment._id,
        rating: enrollment.rating,
        feedback: enrollment.feedback
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding rating', error: error.message });
  }
};

// ✅ Pause Enrollment
export const pauseEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const studentId = req.student?.userId || req.student?._id;

    const enrollment = await Enrollment.findOne({ _id: enrollmentId, studentId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (enrollment.status !== 'active') {
      return res.status(400).json({ message: 'Only active enrollments can be paused' });
    }

    enrollment.status = 'paused';
    await enrollment.save();

    res.status(200).json({
      message: 'Enrollment paused',
      enrollment: {
        enrollmentId: enrollment._id,
        status: enrollment.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error pausing enrollment', error: error.message });
  }
};

// ✅ Resume Enrollment
export const resumeEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const studentId = req.student?.userId || req.student?._id;

    const enrollment = await Enrollment.findOne({ _id: enrollmentId, studentId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (enrollment.status !== 'paused') {
      return res.status(400).json({ message: 'Only paused enrollments can be resumed' });
    }

    enrollment.status = 'active';
    await enrollment.save();

    res.status(200).json({
      message: 'Enrollment resumed',
      enrollment: {
        enrollmentId: enrollment._id,
        status: enrollment.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error resuming enrollment', error: error.message });
  }
};

// ✅ Cancel Enrollment
export const cancelEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const studentId = req.student?.userId || req.student?._id;

    const enrollment = await Enrollment.findOne({ _id: enrollmentId, studentId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.status = 'cancelled';
    await enrollment.save();

    res.status(200).json({
      message: 'Enrollment cancelled',
      enrollment: {
        enrollmentId: enrollment._id,
        status: enrollment.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling enrollment', error: error.message });
  }
};

// ✅ Get Courses by Class (For Enrollment)
export const getCoursesByClass = async (req, res) => {
  try {
    const { classLevel } = req.params;

    const courses = await Course.find({ class: classLevel })
      .select('name subject class difficulty price discountedPrice duration pictures');

    res.status(200).json({
      message: `Courses for ${classLevel} retrieved`,
      count: courses.length,
      courses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};
