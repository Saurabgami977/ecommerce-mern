const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Route imports
const products = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", products);
app.use("/api/v1", user);

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
