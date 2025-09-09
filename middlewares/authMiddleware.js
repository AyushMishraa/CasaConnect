const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({message: "Access Denied"});
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("decoded value:- ", decoded);
      req.user = decoded;
      next();
    } catch (error) {
        res.status(401).json({message:"Invalid token", error: error.message});
    }
}

const isOwner = (req, res, next) => {
    const role = req.user.role;
    console.log("role", role);
    if (role != 'owner'){
      return res.status(403).json({message: "Only owners can perform this action"});
    }
    next();
}

module.exports = {
    verifyToken,
    isOwner
}

