const authorizeUser = (paramUserIdField = "id") => {
  return (req, res, next) => {
    const targetUserId = req.params[paramUserIdField]; 
    const currentUserId = req.userId; 

    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    
    if (currentUserId === targetUserId) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden: Not allowed" });
  };
};

module.exports = authorizeUser;
