const express = require('express');

const hbs = require('hbs');
const path = require('path');

const app = express();
const axios = require('axios');

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

apiUrl = "https://ih-beers-api2.herokuapp.com/"

app.get('/beers', (req, res) => {

  axios.get("url-to-make-request-to")
  .then((theResult)=>{

    // res.render()

  })
  .catch((err)=>{
    console.log(err);
  })


});


app.get('/beers/:id', (req, res) => {

});





app.listen(3000, () => console.log('🏃‍ on port 3000'));
