const express = require("express");
const { jounRegister, jounLogin, updateJounName, getJounByName, updateJounEmail, updateJounAvatar, updateJounPassword, getAllBlogsOfJounById } = require("../controllers/jounController");
const { protectedForJoun } = require("../middlewares/protectedRoutes");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

// For Register New Journalist
router.route("/auth/journalist/register").post(jounRegister);

// For Login Journalist
router.route("/auth/journalist/login").post(jounLogin);

// For Update Avatar Of Journalist
router.route("/joun/update/avatar").put(protectedForJoun,updateJounAvatar);

// For Update Name Of Journalist
router.route("/joun/update/name").put(protectedForJoun,updateJounName);

// For Update Email Of Journalist
router.route("/joun/update/email").put(protectedForJoun,updateJounEmail);

// For Update Name Of Journalist
router.route("/joun/update/password").put(protectedForJoun,updateJounPassword);

// For Finding Journalist By Name
router.route("/joun/search/:search").get(verifyToken,getJounByName);

// For Finding All Blogs Journalist By Id
router.route("/joun/blog/search/:id").get(protectedForJoun,getAllBlogsOfJounById);



module.exports =  router