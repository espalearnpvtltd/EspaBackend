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
  getFilteredCourses,
  getRecommendedCategories,
  searchCourses,
  getCoursesContentList,
  getCourseContentDetails,
  getCourseChapters,
  getChapterLessons,
  getAllClassesAvailable,
  getCoursesForClass,
  getClassCourseStructure,
  getClassCourseChapters,
  getClassChapterLessons
} from '../controllers/courseController.js';
import { verifySecretKey, authenticateUser, authenticateStudent } from '../middleware/auth.js';

const router = express.Router();

// Admin only - Create, Update, Delete
router.post('/', verifySecretKey, createCourse);
router.put('/:id', verifySecretKey, updateCourse);
router.delete('/:id', verifySecretKey, deleteCourse);

// Public - Get all courses (no auth)
router.get('/', getAllCourses);

// Public - Search courses by title, subject, or description
router.get('/search/courses', searchCourses);

// Student/User - Get recommended courses with dynamic categories (JWT required)
router.get('/recommended/categories', authenticateStudent, getRecommendedCategories);

// Student/User - Get recommended courses (JWT required)
router.get('/recommended/by-class', authenticateStudent, getRecommendedByClass);

// Student/User - Get filtered courses (JWT required)
router.get('/filter/all', authenticateStudent, getFilteredCourses);

// Student/User - Get course details with ratings (JWT required)
router.get('/:id/details', authenticateStudent, getCourseWithRatings);

// Student/User - Get single course (JWT required)
router.get('/:id', authenticateStudent, getCourse);

// Student/User - Add rating (JWT required)
router.post('/:id/rating', authenticateStudent, addRating);

// ✅ NEW: Course Content Structure APIs (Public)
router.get('/content/all', getCoursesContentList);
router.get('/content/:courseId', getCourseContentDetails);
router.get('/content/:courseId/chapters', getCourseChapters);
router.get('/content/:courseId/chapters/:chapterId/lessons', getChapterLessons);

// ✅ NEW: Class-Based Course Structure APIs (Public)
router.get('/classes/all', getAllClassesAvailable);
router.get('/classes/:classLevel', getClassCourseStructure);
router.get('/classes/:classLevel/courses', getCoursesForClass);
router.get('/classes/:classLevel/courses/:courseId/chapters', getClassCourseChapters);
router.get('/classes/:classLevel/courses/:courseId/chapters/:chapterId/lessons', getClassChapterLessons);

export default router;
