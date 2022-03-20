const express = require("express");

const {
    registerUser,
    userLogin,
    updateAavatar,
    updateUserAavatar,
    updateUserName,
    updateUserEmail,
    updateUserPassword
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


module.exports = router;
