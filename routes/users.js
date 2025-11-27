import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createUser, loginUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// POST /api/users -> Create/Register user
router.post("/", createUser);

// POST /api/users/login -> Login
router.post("/login", loginUser);

// GET /api/users -> Get all users (Protected)
router.get("/", verifyToken, getAllUsers);

export default router;
