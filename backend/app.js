const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Route imports
const products = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", products);
app.use("/api/v1", user);

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
