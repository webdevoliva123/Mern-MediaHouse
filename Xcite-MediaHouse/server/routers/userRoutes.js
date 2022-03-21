const express = require("express");

const {
    registerUser,
    userLogin,
    updateUserAavatar,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    userLikeBlog,
    userRemoveLikeFromBlog,
    subscribeToJoun,
    unSubscribeToJun,
} = require("../controllers/userControllers");

const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();



// creating Routes

// for user register
router.route("/auth/register").post(registerUser);

// for user login
router.route("/auth/login").post(userLogin);

// for update user avatar
router.route("/user/update/avatar").put(verifyToken,updateUserAavatar);

// for update user name
router.route("/user/update/name").put(verifyToken,updateUserName);

// for update user email
router.route("/user/update/email").put(verifyToken,updateUserEmail);

// for update user password
router.route("/user/update/password").put(verifyToken,updateUserPassword);

// for like blog by user
router.route("/user/blog/like").post(verifyToken,userLikeBlog);

// for remove like from blog by user
router.route("/user/blog/removeLike").post(verifyToken,userRemoveLikeFromBlog);

// for subscribe to joun by user
router.route("/user/cont/subscribe").post(verifyToken,subscribeToJoun);

// for unsubscribe to joun by user
router.route("/user/cont/unsubscribe").post(verifyToken,unSubscribeToJun);


module.exports = router;
