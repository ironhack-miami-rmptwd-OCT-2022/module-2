const express = require('express');

const app = express();
const hbs = require('hbs');

app.use(express.static('public'));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");



app.get('/', (req, res, next) => {

  let data = {
    secretWord: "blahahaha",
    name: "bruce wayne ironhack coding school",
    age: 99,
    certified: true,
    cities: ["Amsterdam", "Barcelona", "Berlin", "Lisbon", "Madrid", "Mexico City", "Miami", "Paris", "Sao Paulo"]
  };

  if(data.age > 200){
    data.old = true;
  }
 
  //  first arugment is the file inside the views folder to show in this route
  res.render("home", data);
  // second argument is an object full of variables that will be available in the hbs file
  });


  app.get('/ga', (req, res, next)=>{
        res.render("home", {
          secretWord: "blahooodazzle",
         name: "general assembly", 
         age: 359, 
         certified: false,
         cities: ["boring city, OK", "sad town, Texas", "Mistakeville, Arkansas"]
        });
  })



  app.get('/cool-cat', (req, res, next)=>{
    res.render("cat-page");
})



  






app.listen(3000, () => console.log('My first app listening on port 3000! '));



