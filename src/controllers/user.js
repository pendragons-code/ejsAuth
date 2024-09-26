const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// user signing up
const userSignup = async (req, res) => {
	console.log(req.body);
	const { username, email, password } = req.body;
	if(!username || !email || !password) return res.status(400).json({ message: "All fields are mandatory" });

	const existUserCheck = await User.findOne({ email });
	if(existUserCheck) return res.status(400).json({ message: "User already exists!" });

	const hashPassword = await bcrypt.hash(password, 15);
	const user = await User.create({ username, email, password: hashPassword });

	res.redirect("/");

	console.log(`${user} created an account.`)
}



// user logging in
const userLogin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if(!user) return res.status(404).json({ message: "User not found" });

	if(user && (await bcrypt.compare(password, user.password))) {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if(!user) return res.status(404).json({ message: "User not found" });

		if(user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ email: user.email, username: user.username, id: user._id }, process.env.SECRET_KEY);
			res.cookie("token", token);
			return res.redirect("/");
		}
	}
}



module.exports = { userSignup, userLogin }
