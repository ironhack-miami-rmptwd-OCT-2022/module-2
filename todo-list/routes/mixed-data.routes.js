const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog.model");
const PetStore = require("../models/PetStore.model");

/* GET home page */
router.get("/list", (req, res, next) => {
	Dog.find().then((allDogs) => {
		PetStore.find((allLocations) => {
			const data = {
				dogs: allDogs,
				stores: allLocations,
			};

			res.render("mixed-data-views/list", data);
		});
	});
});

module.exports = router;
