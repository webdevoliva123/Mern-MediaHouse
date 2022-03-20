const express = require("express");
const { jounRegister } = require("../controllers/jounController");
const router = express.Router();

// Register New Journalist
router.route("/auth/journalist/register").post(jounRegister);



module.exports =  router