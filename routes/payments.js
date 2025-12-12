// routes/payments.js
import express from 'express';
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  getPaymentDetails,
  refundPayment,
  quickEnroll,
  createPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment
} from '../controllers/paymentController.js';
import { verifySecretKey, authenticateStudent } from '../middleware/auth.js';

const router = express.Router();

// ✅ NEW Payment Routes (Auth Required - Course Enrollment)
router.post('/enroll', authenticateStudent, quickEnroll);               // ⭐ ONE-CLICK ENROLLMENT
router.post('/order', authenticateStudent, createPaymentOrder);        // Create payment order
router.post('/verify', authenticateStudent, verifyPayment);             // Verify payment & create enrollment
router.get('/history', authenticateStudent, getPaymentHistory);         // Get user's payment history
router.get('/:orderId/details', authenticateStudent, getPaymentDetails);// Get payment details
router.post('/:orderId/refund', authenticateStudent, refundPayment);   // Refund payment

// ✅ Legacy Routes (Backward Compatibility)
router.post('/', verifySecretKey, createPayment);
router.get('/', getAllPayments);
router.get('/:id', getPayment);
router.put('/:id', verifySecretKey, updatePayment);
router.delete('/:id', verifySecretKey, deletePayment);

export default router;
