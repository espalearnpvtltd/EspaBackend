// routes/classes.js
import express from 'express';
import {
  createClass,
  getAllClasses,
  getClass,
  updateClass,
  deleteClass
} from '../controllers/classController.js';
import { verifySecretKey } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifySecretKey, createClass);
router.get('/', getAllClasses);
router.get('/:id', getClass);
router.put('/:id', verifySecretKey, updateClass);
router.delete('/:id', verifySecretKey, deleteClass);

export default router;
