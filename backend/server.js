const app = require("./app");

const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling uncaught exception

process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Uncaught Exception`);
	process.exit(1);
});

//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
	require("dotenv").config({ path: "backend/config/config.env" });
}

// Connecting to the database
connectDatabase();

cloudinary.config({
	cloud_name: "dzij4kl87",
	api_key: "834393944951484",
	api_secret: "RQrLKwykiCLy-4s-XRoIy3JuEJU",
});

const server = app.listen(process.env.PORT || 4000, () => {
	console.log(
		`Server is working on ${req.protocol}://${req.get("host")}:${
			process.env.PORT || 4000
		}`,
	);
});

// Unhandeled Promise Rejections
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to unhandled promise rejection`);

	server.close(() => {
		process.exit(1);
	});
});
