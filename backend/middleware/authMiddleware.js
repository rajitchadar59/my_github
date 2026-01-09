const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; 
    req.userId = user._id.toString();
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

module.exports = authMiddleware;
