const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/book/create', (request, response) => {
  console.log('Form was posted to the server');
  console.log(request.body);
  response.redirect('/');
});

app.listen(3000);
