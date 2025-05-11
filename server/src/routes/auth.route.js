// Auth Routes
// Handles authentication-related endpoints for the application

import express from "express";
import { login, logout, onboard, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Route: POST /api/auth/signup
 * Access: Public
 * Params: req.body { email, password, fullName }
 * Description: Register a new user
 */
router.post("/signup", signup);

/**
 * Route: POST /api/auth/login
 * Access: Public
 * Params: req.body { email, password }
 * Description: Login user and set JWT cookie
 */
router.post("/login", login);

/**
 * Route: POST /api/auth/logout
 * Access: Private
 * Params: None
 * Description: Logout user and clear JWT cookie
 */
router.post("/logout", logout);

/**
 * Route: POST /api/auth/onboarding
 * Access: Private
 * Params: req.body { fullName, bio, nativeLanguage, learningLanguage, location }
 * Description: Complete user onboarding
 */
router.post("/onboarding", protectRoute, onboard);

/**
 * Route: GET /api/auth/me
 * Access: Private
 * Params: None
 * Description: Get current authenticated user
 */
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;