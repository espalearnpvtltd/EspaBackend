// routes/classes.js
import express from 'express';
import {
  createClass,
  getAllClasses,
  getClass,
  updateClass,
  deleteClass
} from '../controllers/classController.js';

const router = express.Router();

router.post('/', createClass);
router.get('/', getAllClasses);
router.get('/:id', getClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

export default router;
