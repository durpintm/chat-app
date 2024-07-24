const express = require("express");
const registerUser = require("../controller/registerUser.js");
const checkEmail = require("../controller/checkEmail.js");
const checkPassword = require("../controller/checkPassword.js");
const userDetails = require("../controller/userDetails.js");
const logout = require("../controller/logout.js");
const updateUserDetails = require("../controller/updateUserDetails.js");

const router = express.Router();

// create user api
router.post("/register", registerUser);

// check user email
router.post("/email", checkEmail);

// check user password
router.post("/password", checkPassword);

// login user details
router.get("/user-details", userDetails);

// logout user
router.get("/logout", logout);

// update user details
router.post("/update-user", updateUserDetails);

module.exports = router;
