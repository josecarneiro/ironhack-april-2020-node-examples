const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// app.get('/main.css', (request, response) => {
//   response.sendFile(__dirname + '/styles/main.css');
// });

app.get('/jose', (request, response) => {
  response.sendFile(__dirname + '/views/jose.html');
});

app.get('/aline', (request, response) => {
  response.send('Oi sou a Aline');
});

app.get('/santi', (request, response) => {
  response.send('Hola soy Santi 😎');
});

app.get('*', (request, response) => {
  response.send("I don't know who I am");
});

app.listen(3000);
