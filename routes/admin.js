import express from 'express';
import { authenticateUser, authorizeRoles } from '../middleware/auth.js';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
  getStudentsByClass,
  createAdminUser,
  getActivityLog
} from '../controllers/adminController.js';

const router = express.Router();

// All admin routes require authentication and admin/superadmin role
router.use(authenticateUser);
router.use(authorizeRoles('admin', 'superadmin'));

// ✅ Dashboard
router.get('/dashboard', getDashboardStats);

// ✅ User Management
router.get('/users', getAllUsers);
router.get('/students/class/:classId', getStudentsByClass);
router.put('/users/:userId/role', updateUserRole);
router.put('/users/:userId/status', updateUserStatus);
router.delete('/users/:userId', deleteUser);

// ✅ Superadmin only - Create admin users
router.post('/create-admin', authorizeRoles('superadmin'), createAdminUser);

// ✅ Activity Log
router.get('/activity-log', getActivityLog);

export default router;
