const express = require("express");
const router = express.Router();
const PetStore = require("../models/PetStore.model");

/* GET home page */
router.get("/", (req, res, next) => {
	PetStore.find()
		.then((petStores) => {
			const data = {
				petStores,
			};
			res.render("location-views/list", data);
		})
		.catch((err) => next(err));
});

router.get("/create", (req, res, next) => {
	res.render("location-views/create");
});

router.post("/create", (req, res, next) => {
	console.log({ body: req.body });

	const storeData = {
		name: req.body.name,
		location: {
			streetAddress: req.body.streetAddress,
			city: req.body.city,
			state: req.body.state,
			zip: req.body.zip,
		},
	};

	PetStore.create(storeData)
		.then((newStore) => {
			console.log({ newStore });

			// a redirect would have the same endopint as you would put in a link tag.
			res.redirect(`/locations/details/${newStore._id}`);
		})
		.catch((err) => next(err));
});

router.get("/details/:storeId", (req, res, next) => {
	// in your endpoint anything that starts with : is a variable that you created and can have any value that is passed in when typing the url endpoint.
	// this is usually used for passing an ID
	console.log({ params: req.params.storeId });

	PetStore.findById(req.params.storeId)
		.then((petStore) => {
			res.render("location-views/details", { petStore });
		})
		.catch((err) => next(err));
});

module.exports = router;
