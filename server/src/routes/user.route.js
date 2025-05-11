// User Routes
// Handles user-related endpoints for the application
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/user.controller.js";

const router = express.Router();

// Apply auth middleware to all routes (Access: Private)
router.use(protectRoute);

/**
 * Method: GET
 * Route: /api/users/
 * Access: Private
 * Params: None
 * Description: Returns a list of recommended users who are not friends with the current user and are onboarded.
 */
router.get("/", getRecommendedUsers);

/**
 * Method: GET
 * Route: /api/users/friends
 * Access: Private
 * Params: None
 * Description: Returns the current user's friends with selected profile fields.
 */
router.get("/friends", getMyFriends);

/**
 * Method: POST
 * Route: /api/users/friend-request/:id
 * Access: Private
 * Params: id (recipient user ID)
 * Description: Sends a friend request from the current user to the specified recipient.
 */
router.post("/friend-request/:id", sendFriendRequest);

/**
 * Method: PUT
 * Route: /api/users/friend-request/:id/accept
 * Access: Private
 * Params: id (friend request ID)
 * Description: Accepts a pending friend request and adds each user to the other's friends list.
 */
router.put("/friend-request/:id/accept", acceptFriendRequest);

/**
 * Method: GET
 * Route: /api/users/friend-requests
 * Access: Private
 * Params: None
 * Description: Returns incoming and accepted friend requests for the current user.
 */
router.get("/friend-requests", getFriendRequests);

/**
 * Method: GET
 * Route: /api/users/outgoing-friend-requests
 * Access: Private
 * Params: None
 * Description: Returns outgoing (pending) friend requests sent by the current user.
 */
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;