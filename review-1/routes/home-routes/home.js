const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/home", async (req, res, next) => {
	try {
		const response1 = await axios.get(
			"https://pokeapi.co/api/v2/pokemon/snorlax"
		);
		const response2 = await axios.get(
			"https://pokeapi.co/api/v2/pokemon/charmander"
		);
		const response3 = await axios.get(
			"https://pokeapi.co/api/v2/pokemon/weedle"
		);

		console.log({
			response: [response1.data, response2.data, response3.data],
		});

		res.render("home-views/home", {
			pokeData: [response1.data, response2.data, response3.data],
		});
	} catch (error) {
		console.log({ error });

		next(error);
	}
});

router.get("/login", (req, res, next) => {
	res.render("home-views/authPage", { login: true });
});

router.get("/signup", (req, res, next) => {
	res.render("home-views/authPage", { login: false });
});

module.exports = router;
