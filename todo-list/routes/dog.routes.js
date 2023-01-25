const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog.model");
// const PetStore = require("../models/PetStore.model");

// Create route
router.post("/create", (req, res, next) => {
	console.log({ dogCreateBody: req.body });

	Dog.create({ ...req.body, available: true })
		.then((newlyCreatedDog) => {
			console.log({ newlyCreatedDog });

			// the redirect route was created in the locations routes file specifically for adding a newly created dog to the store it was created for. The below route should never be seen in any html file as it was set as a .get route b/c a redirect is only for .get routes and would then be abused by users knowing that they can update a store data by using it.
			res.redirect(
				`/locations/update/add-dog/${req.body.storeId}/${newlyCreatedDog._id}`
			);

			// the below code is in the locations routes that we set up for the redirect in order to keep each routes file manipulating the models they are set to work with.

			// PetStore.findByIdAndUpdate(
			//     req.params.storeId,
			//     { $push: { dogsForSale: req.params.dogId } },
			//     { new: true }
			// )
			//     .then((updatedStore) => {
			//         console.log({ updatedStore });

			//         res.redirect("back");
			//     })
			//     .catch((err) => next(err));
		})
		.catch((err) => next(err));
});

// Read route
router.get("/details/:dogId", (req, res, next) => {
	Dog.findById(req.params.dogId)
		.populate("siblings")
		.then((dog) => {
			Dog.find({ _id: { $ne: dog._id } })
				.then((allOtherDogs) => {
					console.log({ dogDetails: dog, allOtherDogs });

					const data = {
						dog,
						petGender: [
							{ value: "male", name: "Male Dog" },
							{ value: "female", name: "Female Dog" },
						].map((gender) => ({
							...gender,
							selected: gender.value === dog.sex,
						})),
						isEditPage: req.query.isEditPage,
						hasOwner: !!dog.owner.firstName,
						possibleSiblings: allOtherDogs.map((sibling) => {
							console.log({ sibling, dog });

							return {
								...sibling._doc,
								selected: dog.siblings.some(
									(mainDogSibling) => {
										console.log({
											mainDogSibling,
											sibling,
											dog,
										});

										return (
											String(mainDogSibling._id) ===
											String(sibling._id)
										);
									}
								),
							};
						}),
					};

					console.log({
						dogEditData: data,
						possibleSiblings: data.possibleSiblings,
					});

					res.render("dog-views/details", data);
				})
				.catch((err) => next(err));
		})
		.catch((err) => next(err));
});

// Update route
router.post("/update/:dogId", (req, res, next) => {
	console.log({ dogUpdateBody: req.body });

	const dogUpdateData = {
		...req.body,
		available: !!req.body.available,
		onHold: req.body.onHold ? true : false,
		owner: {
			firstName: req.body.ownerFirstName,
			lastName: req.body.ownerLastName,
		},
	};

	Dog.findByIdAndUpdate(req.params.dogId, dogUpdateData, { new: true })
		.then((updatedDog) => {
			console.log({ updatedDog });

			res.redirect(`/dog/details/${req.params.dogId}`);
			// res.render("dog-views/details", {updatedDog});
		})
		.catch((err) => next(err));
});

// Delete router
router.get("/delete/:dogId/:storeId", (req, res, next) => {
	Dog.findByIdAndRemove(req.params.dogId)
		.then(() => {
			console.log(
				`Dog id ${req.params.dogId} has been successfully removed from the DB.`
			);

			// res.redirect('back') is used to refresh the current page. This route will be called from within the locations deatils page and therefore we can just refresh that page in order to get the updated data.
			// res.redirect("back");

			// by updating the location route for when we create a dog to find the location first and have the conditional in place to search whether the id is part of the array of dogs or not. We can redirect to the same route in order to add or remove a dogs id without having to create another route just to remove a dogs id once deleted.
			res.redirect(
				`/locations/update/add-dog/${req.params.storeId}/${req.params.dogId}`
			);
		})
		.catch((err) => next(err));
});

module.exports = router;
