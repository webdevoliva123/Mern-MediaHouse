const express = require("express");
const protectedRoutes = require("../middlewares/protectedRoutes");
const router = express.Router();

// Get all latest Blogs
router.route("/route/authorized").get(protectedRoutes);

module.exports = router;
