const mongoose = require("mongoose");

const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
<<<<<<< HEAD
			useCreateIndex: true,
		})
		.then((data) => {
			console.log(`Mongodb connected with server: ${data.connection.host}`);
=======
		})
		.then((data) => {
			console.log(`MongoDB is connected with server: ${data.connection.host}`);
>>>>>>> parent of a225816 (copied)
		});
};

module.exports = connectDatabase;
