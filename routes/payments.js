// routes/payment.js
import express from "express";
import Payment from "../models/Payment.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE a new Payment (Protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all Payments (Protected)
router.get("/", verifyToken, async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single Payment by ID (Protected)
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a Payment by ID (Protected)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPayment) return res.status(404).json({ message: "Payment not found" });
    res.json(updatedPayment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a Payment by ID (Protected)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
