// Chat Routes
// Handles chat-related endpoints for the application
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";
const router = express.Router();

/**
 * Method: GET
 * Route: /api/chat/token
 * Access: Private (requires authentication)
 * Params: None (uses authenticated user from middleware)
 * Description: Generates and returns a Stream chat token for the authenticated user.
 */
router.get("/token", protectRoute, getStreamToken);

export default router;