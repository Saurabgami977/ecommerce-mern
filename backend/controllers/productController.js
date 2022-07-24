const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product  -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product,
	});
});

// Update Product  -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
	let product = Product.findById(req.params.id);
	if (!product) {
		return res
			.status(500)
			.json({ success: false, message: "product not found" });
	}
	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		product,
	});
});

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
	const resultPerPage = 5;

	const apiFeature = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resultPerPage);
	const products = await apiFeature.query;

	res.status(200).json({ success: true, products });
});

// Get Product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	res.status(200).json({ success: true, product });
});

// Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return res.status(500).json({
			success: false,
			message: "Product not found",
		});
	}

	await product.remove();

	res
		.status(200)
		.json({ success: true, message: "product deleted sucessfully" });
});
