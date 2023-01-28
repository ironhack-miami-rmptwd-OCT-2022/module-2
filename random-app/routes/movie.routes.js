const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");

router.get("/list", (req, res, next) => {
	Movie.find()
		.then((movies) => {
			res.render("index");
		})
		.catch((err) => next(err));
});

router.post("/create", (req, res, next) => {
	Movie.create()
		.then((newlyCreatedMovie) => {
			res.render("index");
		})
		.catch((err) => next(err));
});

router.get("/details/:actorId", (req, res, next) => {
	Movie.findById()
		.then((movie) => {
			res.render("index");
		})
		.catch((err) => next(err));
});

router.post("/update/:actorId", (req, res, next) => {
	Movie.findByIdAndUpdate()
		.then((updatedMovie) => {
			res.render("index");
		})
		.catch((err) => next(err));
});

router.get("/delete/:actorId", (req, res, next) => {
	Movie.findByIdAndRemove()
		.then(() => {
			res.render("index");
		})
		.catch((err) => next(err));
});

module.exports = router;
