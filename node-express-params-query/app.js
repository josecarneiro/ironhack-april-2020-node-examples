const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.get('/:username', (request, response) => {
  const name = request.params.username;

  console.log(request.params);
  console.log(request.query);

  switch (name) {
    case 'jose':
      response.send("Hello, I'm José");
      break;
    case 'santi':
      response.send('Hola soy Santi');
      break;
    case 'aline':
      response.send('Oi sou a Aline');
      break;
    default:
      response.send("I don't know who I am");
  }
  // ...
});

app.listen(3000);
