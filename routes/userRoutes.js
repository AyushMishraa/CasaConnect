const express = require("express");
const { getUserDetails, updateUserDetails } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const UserRouter = express.Router();

UserRouter.get('/getUser', verifyToken, getUserDetails);
UserRouter.patch('/updateUser/:id', verifyToken, updateUserDetails);

module.exports = UserRouter;