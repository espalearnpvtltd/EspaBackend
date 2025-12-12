import Payment from '../models/Payment.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import crypto from 'crypto';

// ✅ Create Payment Order (Initiate Payment)
export const createPaymentOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.student?.userId || req.student?._id;

    if (!courseId || !userId) {
      return res.status(400).json({ message: 'Course ID and User ID are required' });
    }

    // Check if course exists and get its price
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Generate order ID
    const orderId = `ORD_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    // Create payment record
    const payment = await Payment.create({
      userId,
      courseId,
      amount: course.discountedPrice || course.price,
      currency: 'INR',
      status: 'pending',
      orderId,
      paymentGateway: 'razorpay',
      metadata: {
        courseName: course.name,
        courseClass: course.class,
        discount: course.price - (course.discountedPrice || course.price)
      }
    });

    res.status(201).json({
      message: 'Payment order created',
      payment: {
        orderId: payment.orderId,
        amount: payment.amount,
        currency: payment.currency,
        courseId: course._id,
        courseName: course.name,
        coursePrice: course.price,
        discountedPrice: course.discountedPrice || course.price,
        discount: course.price - (course.discountedPrice || course.price)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating payment order', error: error.message });
  }
};

// ✅ Verify Payment & Create Enrollment
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, transactionId, paymentMethod = 'other' } = req.body;
    const userId = req.student?.userId || req.student?._id;

    if (!orderId || !transactionId) {
      return res.status(400).json({ message: 'Order ID and Transaction ID are required' });
    }

    // Find payment
    const payment = await Payment.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment order not found' });
    }

    // Verify user ownership
    if (payment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized payment verification' });
    }

    // Update payment status
    payment.status = 'completed';
    payment.transactionId = transactionId;
    payment.paymentDate = new Date();
    payment.paymentMethod = paymentMethod;
    await payment.save();

    // Create enrollment
    const enrollment = await Enrollment.create({
      userId: payment.userId,
      courseId: payment.courseId,
      paymentId: payment._id,
      enrollmentDate: new Date(),
      status: 'active'
    });

    // Populate enrollment with course and user details
    await enrollment.populate('courseId', 'name subject class');
    await enrollment.populate('userId', 'name email class');

    res.status(201).json({
      message: 'Payment verified and enrollment created successfully',
      enrollment: {
        enrollmentId: enrollment._id,
        courseName: enrollment.courseId.name,
        courseSubject: enrollment.courseId.subject,
        courseClass: enrollment.courseId.class,
        status: enrollment.status,
        enrollmentDate: enrollment.enrollmentDate,
        progress: enrollment.progress
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};

// ✅ Get Payment History
export const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.student?.userId || req.student?._id;

    const payments = await Payment.find({ userId })
      .populate('courseId', 'name subject class')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Payment history retrieved',
      count: payments.length,
      payments: payments.map(p => ({
        paymentId: p._id,
        orderId: p.orderId,
        transactionId: p.transactionId,
        courseName: p.courseId?.name,
        amount: p.amount,
        status: p.status,
        paymentDate: p.paymentDate || p.createdAt,
        paymentMethod: p.paymentMethod
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching payment history', error: error.message });
  }
};

// ✅ Get Payment Details
export const getPaymentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.student?.userId || req.student?._id;

    const payment = await Payment.findOne({ orderId, userId })
      .populate('courseId')
      .populate('userId', 'name email class');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({
      message: 'Payment details retrieved',
      payment: {
        orderId: payment.orderId,
        transactionId: payment.transactionId,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        courseName: payment.courseId.name,
        coursePrice: payment.courseId.price,
        discountedPrice: payment.courseId.discountedPrice,
        paymentDate: payment.paymentDate,
        createdAt: payment.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching payment details', error: error.message });
  }
};

// ✅ Refund Payment
export const refundPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.student?.userId || req.student?._id;

    const payment = await Payment.findOne({ orderId, userId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.status !== 'completed') {
      return res.status(400).json({ message: 'Only completed payments can be refunded' });
    }

    // Update payment
    payment.status = 'refunded';
    payment.refundAmount = payment.amount;
    payment.refundDate = new Date();
    await payment.save();

    // Cancel enrollment
    const enrollment = await Enrollment.findOne({ paymentId: payment._id });
    if (enrollment) {
      enrollment.status = 'cancelled';
      await enrollment.save();
    }

    res.status(200).json({
      message: 'Payment refunded successfully',
      payment: {
        orderId: payment.orderId,
        status: payment.status,
        refundAmount: payment.refundAmount,
        refundDate: payment.refundDate
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error refunding payment', error: error.message });
  }
};

// ✅ ONE-CLICK ENROLLMENT: Direct Enrollment (No Payment Gateway Required - STUDENTS ONLY)
export const quickEnroll = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.student?.userId || req.student?._id;

    if (!courseId || !userId) {
      return res.status(400).json({ message: 'Course ID and User ID are required' });
    }

    // Get user and check if they are a student
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can enroll in courses' });
    }

    // 1️⃣ Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // 2️⃣ Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // 3️⃣ Directly enroll student (NO PAYMENT REQUIRED - Payment Gateway Not Active)
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      status: 'active',
      progress: 0,
      enrollmentDate: new Date()
    });

    res.status(201).json({
      message: 'Enrollment successful! You are now enrolled in this course.',
      enrollment: {
        enrollmentId: enrollment._id,
        studentName: user.name,
        studentEmail: user.email,
        courseName: course.name,
        courseClass: course.class,
        subject: course.subject,
        price: course.price,
        discountedPrice: course.discountedPrice || course.price,
        status: enrollment.status,
        progress: enrollment.progress,
        enrollmentDate: enrollment.enrollmentDate,
        startDate: new Date()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Enrollment failed', error: error.message });
  }
};

// ✅ Legacy: Create Payment (kept for backward compatibility)
export const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({ message: 'Payment created', payment });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error });
  }
};

// ✅ Legacy: Get All Payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments' });
  }
};

// ✅ Legacy: Get Single Payment
export const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed' });
  }
};

// ✅ Update Payment ✅✅✅ FIXED
export const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Payment updated', payment });
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// ✅ Delete Payment
export const deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
