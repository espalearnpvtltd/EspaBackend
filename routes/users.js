import express from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('admin', 'superadmin'), getAllUsers);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, authorizeRoles('admin', 'superadmin'), updateUser);
router.delete('/:id', authenticate, authorizeRoles('admin', 'superadmin'), deleteUser);

export default router;
