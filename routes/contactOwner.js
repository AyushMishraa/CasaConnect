const express = require("express");
const { getOwnerDetails } = require("../controllers/contactOwner");
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:id/contactOwner', verifyToken, getOwnerDetails);

module.exports = router;