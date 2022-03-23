const express = require("express");
const { acceptJournalist, rejectJournalist, totalBlogOfWeb, totalJounOfWeb, totalUserOfWeb } = require("../controllers/adminController");
const { protectedForAdmin } = require("../middlewares/protectedRoutes");
const router = express.Router();

// For Accepting Journalist as a Confrim Journalist
router.route("/admin/accept/:id").post(protectedForAdmin,acceptJournalist);

// For Rejecting Journalist
router.route("/admin/reject/:id").post(protectedForAdmin,rejectJournalist);

// For Getting Total Blog Of Web
router.route("/admin/web/totalBlog").get(protectedForAdmin,totalBlogOfWeb);

// For Getting Total Journalist Of Web
router.route("/admin/web/totalJournalist").get(protectedForAdmin,totalJounOfWeb);

// For Getting Total Users Of Web
router.route("/admin/web/totalUser").get(protectedForAdmin,totalUserOfWeb);

module.exports = router;
