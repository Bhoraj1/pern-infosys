import pkg from "jsonwebtoken";
const { verify } = pkg;
import { errorHandler } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  // Check if token exists
  if (!token) {
    return next(errorHandler(401, "No token provided"));
  }

  try {
    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to the `req.user` object
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return next(errorHandler(403, "Invalid or expired token"));
  }
};
