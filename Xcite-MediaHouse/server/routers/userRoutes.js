const express = require("express");

const {
    registerUser,
    userLogin,
    updateUserAavatar,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    userRemoveLikeFromBlog,
    subscribeToJoun,
    unSubscribeToJun,
    forgetPasswordUser,
    authForResetPassPage,
    resetPassword,
    userLikeBlog,
    saveBlog,
    unsaveBlog,
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
router.route("/user/blog/like").put(verifyToken,userLikeBlog);

// for remove like from blog by user
router.route("/user/blog/removeLike").put(verifyToken,userRemoveLikeFromBlog);

// for subscribe to joun by user
router.route("/user/cont/subscribe").put(verifyToken,subscribeToJoun);

// for unsubscribe to joun by user
router.route("/user/cont/unsubscribe").put(verifyToken,unSubscribeToJun);

// for save blog
router.route("/user/blog/save/:id").put(verifyToken,saveBlog);

// for unsave blog
router.route("/user/blog/unsave/:id").put(verifyToken,unsaveBlog);

//for forget password of user
router.route("/user/forgetPassword").post(forgetPasswordUser);

// for auth for resest password page
router.route("/user/auth/resetPassword").post(authForResetPassPage);

// for reset Password
router.route("/user/resetPassword/:id/:token").post(resetPassword);


module.exports = router;
