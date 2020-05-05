const express = require('express');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
  response.render('index', { message: 'My name is José' });
});

app.get('/jose', (request, response) => {
  response.render('index', { message: 'My name is José' });
});

app.get('/aline', (request, response) => {
  response.render('index', { message: 'Oi o meu nome é Aline' });
});

app.get('/santi', (request, response) => {
  response.render('index', { message: 'Hola mi nombre es Santi' });
});

app.get('/about', (request, response) => {
  response.render('about', {
    name: 'José Carneiro',
    age: 26,
    location: {
      city: 'Lisbon',
      country: 'Portugal'
    }
  });
});

app.listen(3000);
