const mongoose = require("mongoose");

require("dotenv").config();

const connectDb = async () => {
	await mongoose.connect(process.env.mongodbUri)
	.catch((err) => {
		process.exit(1);
	})
	.then(() => {
		console.log("Connecting to database");
	});
}

module.exports = connectDb;
