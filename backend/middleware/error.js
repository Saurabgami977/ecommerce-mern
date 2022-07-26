const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.stack || "Internal server error";

	// Wrong MongoDB ID error
	if (err.name === "CastError") {
		const message = `Resource not found. Invalud: ${err.path}`;
		err = new ErrorHandler(message, 400);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};
