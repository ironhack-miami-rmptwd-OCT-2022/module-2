const express = require('express');

const app = express();

app.use(express.static('public'));


app.get('/', (request, response, next) => {
    console.log(request);
    response.sendFile(__dirname + '/views/home.html');
  });




  app.get('/cool-cat', (request, response, next) => {
    console.log(request);
    response.sendFile(__dirname + '/views/cat-page.html');
  });

  








app.listen(3000, () => console.log('My first app listening on port 3000! '));



