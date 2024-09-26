const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/auth.js");

router.get("/", validateToken, (req, res) => {
	res.render("home", { user: req.userData });
});

router.get("/", (req, res) => {
	res.render("home");
});

router.get("/signup", (req, res) => {
	res.render("signup");
});

router.get("/login", (req, res) => {
	res.render("login");
});

module.exports = router;
