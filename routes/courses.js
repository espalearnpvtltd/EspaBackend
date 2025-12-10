import express from 'express';
import { 
  createCourse, 
  getAllCourses, 
  getCourse, 
  updateCourse, 
  deleteCourse, 
  addRating, 
  getCourseWithRatings,
  getRecommendedByClass,
  getCoursesByStream,
  getCoursesByExam,
  getFilteredCourses
} from '../controllers/courseController.js';
import { verifySecretKey, authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifySecretKey, createCourse);
router.get('/', getAllCourses);
router.get('/recommended/by-class', getRecommendedByClass);
router.get('/filter/all', getFilteredCourses);
router.get('/stream/:stream', getCoursesByStream);
router.get('/exam/:exam', getCoursesByExam);
router.get('/:id/details', getCourseWithRatings);
router.get('/:id', getCourse);
router.put('/:id', verifySecretKey, updateCourse);
router.delete('/:id', verifySecretKey, deleteCourse);
router.post('/:id/rating', addRating);

export default router;
