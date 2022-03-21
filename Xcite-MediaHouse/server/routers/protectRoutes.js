const express = require("express");
const { protected } = require("../middlewares/protectedRoutes");
const router = express.Router();

// Check Is Route Is Protected
router.route("/route/authorized").get(protected);

module.exports = router;
