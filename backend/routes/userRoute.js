const express = require("express");
const {
<<<<<<< HEAD
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
=======
	forgotPassword,
	registerUser,
	loginUser,
	logout,
} = require("../controllers/usercontroller");
>>>>>>> parent of a225816 (copied)

const router = express.Router();

router.route("/register").post(registerUser);
<<<<<<< HEAD

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
=======
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").post(logout);
>>>>>>> parent of a225816 (copied)

module.exports = router;
