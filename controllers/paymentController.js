// controllers/paymentController.js
import Payment from '../models/Payment.js';

// ✅ Create Payment
export const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({ message: 'Payment created', payment });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error });
  }
};

// ✅ Get All Payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments' });
  }
};

// ✅ Get Single Payment
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
