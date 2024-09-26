const express = require("express");
const app = express();
const connectDb = require("./config/dbConnection.js");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectDb();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
	session({
		secret: process.env.SESSION_KEY,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 6000
		}
	})
);



app.use("/", require("./routes/getRequestManager.js"));
app.use("/user", require("./routes/postRequestManager.js"));



app.listen(PORT, (error) => {
	console.log(`App is on http://localhost:${PORT}`)
	if(error) return console.error(error);
});
