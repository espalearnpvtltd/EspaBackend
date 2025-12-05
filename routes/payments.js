// routes/payments.js
import express from 'express';
import {
  createPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment
} from '../controllers/paymentController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('admin'), createPayment);
router.get('/', authenticate, authorizeRoles('admin', 'teacher'), getAllPayments);
router.get('/:id', authenticate, authorizeRoles('admin', 'teacher'), getPayment);
router.put('/:id', authenticate, authorizeRoles('admin'), updatePayment);
router.delete('/:id', authenticate, authorizeRoles('admin'), deletePayment);

export default router;
