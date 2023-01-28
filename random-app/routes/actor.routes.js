const express = require("express");
const router = express.Router();
const Actor = require("../models/Actor.model");

router.get("/list", (req, res, next) => {
	Actor.find()
		.then((actors) => {
			res.render("actor-views/list", { actors });
		})
		.catch((err) => next(err));
});

router.get("/create", (req, res, next) => {
	res.render("actor-views/create");
});

router.post("/create", (req, res, next) => {
	Actor.create(req.body)
		.then((newlyCreatedActor) => {
			// res.render("actor-views/details", {actor: newlyCreatedActor});
			res.redirect(`/actor/details/${newlyCreatedActor._id}`);
		})
		.catch((err) => next(err));
});

router.get("/details/:actorId", (req, res, next) => {
	Actor.findById(req.params.actorId)
		.then((actor) => {
			res.render("actor-views/details", { actor });
		})
		.catch((err) => next(err));
});

// router.get("/update/:actorId", (req, res, next) => {
//     Actor.findById(req.params.actorId)
//     .then((actor) => {
//         res.render("actor-views/update", {actor});
//     }).catch(err => next(err))
// })

router.post("/update/:actorId", (req, res, next) => {
	if (!req.body.firstName || !req.body.lastName || req.body.age) {
		Actor.findById(req.params.actorId)
			.then((actor) => {
				res.render("actor-views/details", {
					actor,
					message: "Missing Actor Data",
				});
			})
			.catch((err) => next(err));

		return;
	}

	Actor.findByIdAndUpdate(req.params.actorId, req.body, { new: true })
		.then((updatedActor) => {
			res.render("actor-views/details", { actor: updatedActor });
			// res.redirect(`/actor/details/${updatedActor._id}`);
		})
		.catch((err) => next(err));
});

router.get("/delete/:actorId", (req, res, next) => {
	Actor.findByIdAndRemove(req.params.actorId)
		.then(() => {
			// res.render("index");
			res.redirect("back");
		})
		.catch((err) => next(err));
});

module.exports = router;
