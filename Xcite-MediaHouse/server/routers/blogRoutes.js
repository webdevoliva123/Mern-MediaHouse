const express = require("express");
const {getAllBlogs, getAllNewsBlogs, getAllBusinessBlogs, getAllSociologyBlogs, getAllTechBlogs, getAllEconomicBlogs, getAllOtherBlogs, getBlogById, getAllBlogsOfJounById, get4LatestNewsBlogs, get4LatestBusinessBlogs, get4LatestSociologyBlogs, get4LatestTechBlogs, get4LatestEconomicBlogs, get4LatestOtherBlogs, getBlogByTag, get6LatestBlogs} = require("../controllers/blogController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();


// Get Blogs By Tag
router.route("/blog/search/:search").get(getBlogByTag);

// Get 4 Latest Blogs
router.route("/blog/6latestBlogs").get(get6LatestBlogs);

// Get 4 Latest News Blogs
router.route("/blog/4latestNewsBlogs").get(get4LatestNewsBlogs);

// Get 4 Latest Business Blogs
router.route("/blog/4latestBusniessBlogs").get(get4LatestBusinessBlogs);

// Get 4 Latest Sociology Blogs
router.route("/blog/4latestSociologyBlogs").get(get4LatestSociologyBlogs);

// Get 4 Latest Tech Blogs
router.route("/blog/4latestTechBlogs").get(get4LatestTechBlogs);

// Get 4 Latest Tech Blogs
router.route("/blog/4latestTechBlogs").get(get4LatestTechBlogs);

// Get 4 Latest Economic Blogs
router.route("/blog/4latestEconomicBlogs").get(get4LatestEconomicBlogs);

// Get 4 Latest Other Blogs
router.route("/blog/4latestOtherBlogs").get(get4LatestOtherBlogs);

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
router.route("/blog/:id").post(verifyToken,getBlogById);

// get all lastest blog of joun by id
router.route("/joun/blog/:id").get(verifyToken,getAllBlogsOfJounById);

module.exports = router;
