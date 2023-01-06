const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:


app.get("/", (req, res, next)=>{
  res.send("this is the home page, welcome")
})

app.get('/beers', (req, res) => {
  // if punkAPI.getbeers() works then the .then runs and if it doesnt work the .catch runs 
  // if it works, the word inside the parenthesese will be equal to the result of the punkAPI funtion
  // if it doesnt work, the thing inside the .catch parenthesese will be equal to the error that the API returns
  punkAPI.getBeers()
  .then((stuffIGetBackFromAPI)=>{
    // you should always console.log the response when working with an api
    console.log(stuffIGetBackFromAPI);

    // this is the most important line in each route
    // any other code before this line, is basically just getting the data ready so that we can pass it in on the res.render
    res.render('index', {theBeers: stuffIGetBackFromAPI});
  })
  .catch((err)=>{
    console.log(err);
  })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
