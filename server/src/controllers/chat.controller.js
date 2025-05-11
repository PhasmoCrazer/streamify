import { generateStreamToken } from "../config/stream.config.js";

// Route: GET /api/chat/token
// Access: Private (requires authentication)
// Description: Generates and returns a Stream chat token for the authenticated user.
// Params: req.user.id (String) - User ID from authentication middleware
export async function getStreamToken(req, res) {
  try {
    const token = generateStreamToken(req.user.id);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}