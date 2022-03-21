const express = require("express");
const createBlog = require("../controllers/createBlogController");
const { protectedForJoun } = require("../middlewares/protectedRoutes");
const router = express.Router();

// temp create blog
router.route("/blog/createBlog").post(protectedForJoun,createBlog);


module.exports = router;