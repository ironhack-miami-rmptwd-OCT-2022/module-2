const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
	res.render("index");
});

// basic example of axios call to using .get method (.get method is a method used for getting data from an api);
// /* GET home page */
// router.get("/", async (req, res, next) => {
// 	try {
// 		// const response = await fetch(
// 		// 	"https://pokeapi.co/api/v2/pokemon/snorlax"
// 		// );
// 		const response = await axios.get(
// 			"https://pokeapi.co/api/v2/pokemon/snorlax"
// 		);

// 		// in the response from an API call, you will look for one of 3 primary key words to find your information. 'result', 'data', or 'body'
// 		console.log({ response: response.data });

// 		res.render("index", { pokeData: response.data });
// 	} catch (error) {
// 		console.log({ error });

// 		// next is used to move to the next process in your code. Usually used in the catch method since ironlauncher has an error handler in place.
// 		next(error);
// 	}
// });

// example of async await and .then .catch

// async await example
// router.get("/", async (req, res, next) => {
// 	try {
// 		const response1 = await axios.get("https://pokeapi.co/api/v2/pokemon/snorlax");
//     const response2 = await axios.get("https://pokeapi.co/api/v2/pokemon/charmander");
//     const response3 = await axios.get("https://pokeapi.co/api/v2/pokemon/weedle");

// 		console.log({ response: [...response1.data, ...response2.data, ...response3.data] });

// 		res.render("index", { pokeData: [...response1.data, ...response2.data, ...response3.data] });
// 	} catch (error) {
// 		console.log({ error });

//     next(error);
// 	}
// });

// // .then .catch example
// router.get("/", (req, res, next) => {
// 	axios.get("https://pokeapi.co/api/v2/pokemon/snorlax")
// 		.then((response1) => {
// 			axios.get("https://pokeapi.co/api/v2/pokemon/charmander")
// 				.then((response2) => {
// 					axios.get("https://pokeapi.co/api/v2/pokemon/weedle")
// 						.then((response3) => {
// 							console.log({ response: [...response1.data, ...response2.data, ...response3.data] });

// 							res.render("index", {
// 								pokeData: [
// 									...response1.data,
// 									...response2.data,
// 									...response3.data,
// 								],
// 							});
// 						}).catch((error) => next(error));
// 				}).catch((error) => next(error));
// 		}).catch((error) => next(error));
// });

module.exports = router;
