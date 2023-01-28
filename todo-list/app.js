// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.use(
	session({
		secret: "123secret",
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 600000,
		},
		store: MongoStore.create({
			mongoUrl: "mongodb://localhost/todo-list",
		}),
	})
);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Pet Store";

app.use((req, res, next) => {
	res.locals.appTitle = `${capitalize(
		projectName
	)} created with IronLauncher`;
	res.locals.currentUser = req.session.currentUser;
	res.locals.isUserAdmin = req.session.currentUser.role === "admin";
	next();
});

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
// adding /location means every route in the location.routes file will automatically have /locaton prefixed to the endpoint.
app.use("/locations", require("./routes/locations.routes"));
app.use("/dog", require("./routes/dog.routes"));
app.use("/auth", require("./routes/auth.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
