const express = require("express");
const { jounRegister, jounLogin } = require("../controllers/jounController");
const router = express.Router();

// Register New Journalist
router.route("/auth/journalist/register").post(jounRegister);


// Login Journalist
router.route("/auth/journalist/login").post(jounLogin);



module.exports =  router