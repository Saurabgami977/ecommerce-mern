const express = require("express");
const {
	forgotPassword,
	registerUser,
	loginUser,
	logout,
} = require("../controllers/usercontroller");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").post(logout);

module.exports = router;
