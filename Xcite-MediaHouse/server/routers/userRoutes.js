const express = require("express");

const {
    registerUser,
    userLogin
} = require("../controllers/userControllers");

const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();



// creating Routes

// for user register
router.route("/register").post(registerUser);

// for user login
router.route("/login").post(userLogin);


module.exports = router;
