import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// -----------------------------------------------------------------------------
/**
 * Middleware: protectRoute
 * Purpose: Protects routes by verifying JWT from cookies and authenticating user.
 * Usage: Attach as middleware to routes that require authentication.
 * Access: Private (requires valid JWT in cookies)
 *
 * @function protectRoute
 * @param {Object} req - Express request object (expects JWT in cookies)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Responds with 401 if unauthorized, 500 on server error, or attaches user to req and calls next()
 *
 * Example:
 *   router.get('/private', protectRoute, (req, res) => { ... });
 */
// -----------------------------------------------------------------------------
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};