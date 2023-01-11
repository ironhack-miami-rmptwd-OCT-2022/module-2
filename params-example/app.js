const express = require('express');

const app = express();
const hbs = require('hbs');
const Wrapper = require('punkapi-javascript-wrapper');

app.use(express.static('public'));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

const punkAPI = new Wrapper();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res, next)=>{
  res.render("home");
})



app.get('/beers', (req, res, next) => {
    punkAPI.getBeers()
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
  });




  app.get('/beers/:blah', (req, res, next) => {
    //              |
    //       req.params.blah


    punkAPI.getBeer(req.params.blah)
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
  });




  app.post('/new-beer', (req, res, next)=>{


    res.send(req.body);

    
  })






  






app.listen(3000, () => console.log('My first app listening on port 3000! '));



