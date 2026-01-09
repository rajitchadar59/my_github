const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')

const userRouter = express.Router();


userRouter.post("/signup", userController.signup);
userRouter.post("/login",userController.login);
userRouter.get("/userProfile/:id",userController.getUserProfile);
userRouter.delete("/deleteProfile/:id",authMiddleware,userController.deleteUserProfile);
userRouter.get("/profile/:username", authMiddleware, userController.getUserProfileByUsername);
userRouter.put("/profile/update",authMiddleware, userController.updateProfileDetails);
userRouter.get("/profile/:username/repos", authMiddleware, userController.getUserProfileByUsername);
userRouter.post("/user/follow",authMiddleware, userController.followUnfollowUser);
userRouter.get("/profile/:username/following",userController.getFollowingUsers);
userRouter.get("/user/is-following/:id", authMiddleware, userController.isFollowingUser);
userRouter.get("/profile/:username/follow-stats", userController.getFollowStats);




module.exports = userRouter;

