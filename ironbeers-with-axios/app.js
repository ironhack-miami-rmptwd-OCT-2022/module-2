const express = require('express');

const app = express();
const path = require('path');
const hbs = require('hbs');
const axios = require('axios');
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, "/views/partials"));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

baseURL = "https://ih-beers-api2.herokuapp.com"

app.get('/beers', (req, res) => {
  axios.get(`${baseURL}/beers`)
  .then((theResult)=>{
    console.log(theResult.data);
    res.render("beers", {theBeers: theResult.data.reverse()})
  })
  .catch((err)=>{
    console.log(err);
  })
});


app.get('/beers/:id', (req, res, next) => {
  axios.get(`${baseURL}/beers/${req.params.id}`)
  .then((result)=>{
    console.log(result.data);
    res.render("beerDetails", {theBeer: result.data})
  })
  .catch((err)=>{
    console.log(err);
  })
});


app.get("/new-beer", (req, res, next)=>{
  res.render("newBeer");
})

app.post("/create-beer", (req, res, next)=>{
  const {beerName, tagline, description, firstBrewed, 
        brewerTips, attentuationLevel, contributedBy} = req.body;

        axios.post(`${baseURL}/beers/new`, {
          name: beerName, 
          tagline: tagline, 
          description: description,
          first_brewed: firstBrewed,
          brewer_tips: brewerTips,
          attentuation_level: attentuationLevel,
          contributed_by: contributedBy
        })
        .then((result)=>{
          res.redirect("/beers");
        })
        .catch((err)=>{
          console.log(err);
        })



})





app.listen(3000, () => console.log('🏃‍ on port 3000'));
