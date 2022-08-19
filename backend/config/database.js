const mongoose = require("mongoose");

//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
	require("dotenv").config({ path: "backend/config/config.env" });
}

const connectDatabase = () => {
	mongoose
		.connect(
			process.env.NODE_ENV !== "PRODUCTION"
				? process.env.DEV_DB_URI
				: process.env.DB_URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		)
		.then((data) => {
			console.log(`MongoDB is connected with server: ${data.connection.host}`);
		});
};

module.exports = connectDatabase;
