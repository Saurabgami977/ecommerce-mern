const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling uncaught exception

process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Uncaught Exception`);
	process.exit(1);
});

//Config

dotenv.config({ path: "backend/config/config.env" });

// Connecting to the database
connectDatabase();
cloudinary.config({
	cloud_name: "dzij4kl87",
	api_key: "834393944951484",
	api_secret: "RQrLKwykiCLy-4s-XRoIy3JuEJU",
});

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandeled Promise Rejections
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to unhandled promise rejection`);

	server.close(() => {
		process.exit(1);
	});
});
