const express = require("express");
const registerUser = require("../controller/registerUser.js");
const checkEmail = require("../controller/checkEmail.js");

const router = express.Router();

// create user api
router.post("/register", registerUser);

// check user email
router.post("/email", checkEmail);

module.exports = router;
