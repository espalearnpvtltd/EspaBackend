// routes/payments.js
import express from 'express';
import {
  createPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment
} from '../controllers/paymentController.js';
import { verifySecretKey } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifySecretKey, createPayment);
router.get('/', getAllPayments);
router.get('/:id', getPayment);
router.put('/:id', verifySecretKey, updatePayment);
router.delete('/:id', verifySecretKey, deletePayment);

export default router;
