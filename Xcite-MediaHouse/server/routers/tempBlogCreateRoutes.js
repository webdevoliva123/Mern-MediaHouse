const express = require("express");
const createBlog = require("../controllers/tempBlogCreateController");
const router = express.Router();

// temp create blog
router.route("/blog/createBlog").post(createBlog);


module.exports = router;