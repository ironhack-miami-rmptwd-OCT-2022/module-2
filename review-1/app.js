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

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "review-1";

// ** this is a global variable. It can be declared after your middleware, before your routes and is usually the name that you enter after app.locals.<your variable name here>.

// * this is used when you want to declare a varialbe that can be seen and utilized on all your view files (ie: user info after they have logged in).
app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;
app.locals.currentUser = { name: "Blah", email: "blah@gmail.com" };

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

app.use("/", require("./routes/home-routes/home"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
