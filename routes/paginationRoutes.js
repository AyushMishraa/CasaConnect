const express = require("express");
const { pagination } = require("../controllers/paginationController");
const router = express.Router();

router.post('/paging', pagination);

module.exports = router;