const express = require("express");
const router = express.Router();
const PetStore = require("../models/PetStore.model");

// READ from 'CRUD'
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

// CREATE from 'CRUD'
router.post("/create", (req, res, next) => {
	// console.log({ body: req.body });

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
			// console.log({ newStore });

			// a redirect would have the same endopint as you would put in a link tag.
			res.redirect(`/locations/details/${newStore._id}`);
		})
		.catch((err) => next(err));
});

// READ route
router.get("/details/:storeId", (req, res, next) => {
	// in your endpoint anything that starts with : is a variable that you created and can have any value that is passed in when typing the url endpoint.
	// this is usually used for passing an ID
	// console.log({ params: req.params.storeId });

	PetStore.findById(req.params.storeId)
		.populate("dogsForSale")
		.then((petStore) => {
			res.render("location-views/details", {
				petStore,
				petGender: [
					{ value: "male", name: "Male Dog" },
					{ value: "female", name: "Female Dog" },
				],
			});
		})
		.catch((err) => next(err));
});

// UPDATE from 'CRUD'
// this route is being created to be called from a redirect from another route and should not be used in any html.
router.get("/update/add-dog/:storeId/:dogId", (req, res, next) => {
	console.log({ updateBody: req.body, params: req.params });

	if (!req.params.storeId || !req.params.dogId) {
		const theError = new Error("No Id was provided!");

		throw theError;
	}

	// when using findByIdAndUpdate the first argument is the id your searching for. the 2nd is the content your updating based on the model (anything passed here will override or modify existing data, make sure if the field has data that you include it when updating new data being added if needed.). The 3rd parameter ({new: true}), is just to assure that you get the updated and not previous data if you need to log it or pass it as info to a page.
	// PetStore.findByIdAndUpdate(
	// 	req.params.storeId,
	// 	{ $push: { dogsForSale: req.params.dogId } },
	// 	{ new: true }
	// )
	// 	.then((updatedStore) => {
	// 		console.log({ updatedStore });

	// 		res.redirect("back");
	// 	})
	// 	.catch((err) => next(err));

	// this method works well for things like a 'Like' that you will add to or remove from elements (ie: comments, pics, vids, replies, etc.)
	PetStore.findById(req.params.storeId)
		.then((foundStore) => {
			if (foundStore.dogsForSale.includes(req.params.dogId)) {
				foundStore.dogsForSale.pull(req.params.dogId);
			} else {
				foundStore.dogsForSale.push(req.params.dogId);
			}
			foundStore
				.save()
				.then((updatedStore) => {
					console.log({ updatedStore });

					res.redirect("back");
				})
				.catch((err) => next(err));
		})
		.catch((err) => next(err));
});

// DELETE from 'CRUD'
router.post("/delete", (req, res, next) => {
	// console.log({ body: req.body });

	if (!req.body.storeId) {
		const theError = new Error("No Id was provided!");

		throw theError;
	}

	PetStore.findByIdAndRemove(req.body.storeId)
		.then(() => {
			console.log({
				storeDeleted: `Store Id ${req.body.storeId} has been removed from DB.`,
			});

			res.redirect("/locations");
		})
		.catch((err) => next(err));
});

module.exports = router;
