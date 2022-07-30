const express = require("express");
const {
<<<<<<< HEAD
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
=======
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
>>>>>>> parent of a225816 (copied)

const router = express.Router();

router.route("/products").get(getAllProducts);
<<<<<<< HEAD

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
=======
router
	.route("/products/new")
	.post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router
	.route("/products/:id")
	.put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
	.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
	.get(getProductDetails);
>>>>>>> parent of a225816 (copied)

module.exports = router;
