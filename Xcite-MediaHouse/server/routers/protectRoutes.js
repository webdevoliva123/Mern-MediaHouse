const express = require("express");
const protectedRoutes = require("../middlewares/protectedRoutes");
const router = express.Router();

// Check Is Route Is Protected
router.route("/route/authorized").get(protectedRoutes);

module.exports = router;
