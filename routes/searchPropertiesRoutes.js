const express = require("express");
const { searchProperties } = require("../controllers/searchPropertiesController");
const router = express.Router();

router.get('/searchProperty', searchProperties);

module.exports = router;