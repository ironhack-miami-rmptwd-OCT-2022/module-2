const express = require("express");
const router = express.Router();
const Actor = require("../models/Actor.model");
const Movie = require("../models/Movie.model");

router.get("/actor/update/:actorId", (req, res, next) => {
	Actor.findById(req.params.actorId)
		.then((actor) => {
			Movie.find()
				.then((movies) => {
					res.render("actor-views/update", { actor, movies });
				})
				.catch((err) => next(err));
		})
		.catch((err) => next(err));
});

module.exports = router;
