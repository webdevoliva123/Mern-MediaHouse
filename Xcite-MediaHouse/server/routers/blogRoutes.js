const express = require("express");
const {getAllBlogs, getAllNewsBlogs, getAllBusinessBlogs, getAllSociologyBlogs, getAllTechBlogs, getAllEconomicBlogs, getAllOtherBlogs, getBlogById, getAllBlogsOfJounById} = require("../controllers/blogController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

// Get all latest Blogs
router.route("/blog/allBlogs").get(verifyToken,getAllBlogs);

// Get all latest news blogs
router.route("/blog/newBlogs").get(verifyToken,getAllNewsBlogs);

// Get all latest news blogs
router.route("/blog/businessBlogs").get(verifyToken,getAllBusinessBlogs);

// Get all latest sociology blogs
router.route("/blog/sociologyBlogs").get(verifyToken,getAllSociologyBlogs);

// Get all latest tech blogs
router.route("/blog/techBlogs").get(verifyToken,getAllTechBlogs);

// Get all latest economic blogs
router.route("/blog/economicBlogs").get(verifyToken,getAllEconomicBlogs);

// Get all latest other blogs
router.route("/blog/otherBlogs").get(verifyToken,getAllOtherBlogs);

// get blog by blog id
router.route("/blog/:id").get(verifyToken,getBlogById);

// get all lastest blog of joun by id
router.route("/joun/blog/:id").get(verifyToken,getAllBlogsOfJounById);

module.exports = router;
