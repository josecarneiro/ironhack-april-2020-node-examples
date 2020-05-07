const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const path = require('path');

// Required so that environment variables in .env file
// become available to node app
const dotenv = require('dotenv');
dotenv.config();

const app = express();

console.log(process.env);

const apiKey = process.env.OMDB_API_KEY;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('home');
});

app.get('/results', (request, response) => {
  const term = request.query.term;
  axios
    .get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${term}`)
    .then(result => {
      const data = result.data;
      const searchResults = data.Search;
      response.render('list', { results: searchResults });
    })
    .catch(error => {
      console.log('There was an error loading response from api');
      console.log(error);
      response.send('There was an error processing your request.');
    });
});

app.get('/:id', (request, response) => {
  const id = request.params.id;
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=` + id;
  axios
    .get(url)
    .then(result => {
      const movie = result.data;
      response.render('single', { movie });
    })
    .catch(error => {
      console.log('There was an error loading response from api');
      console.log(error);
      response.send('There was an error processing your request.');
    });
});

app.listen(3000, () => {
  console.log('App has started. Visit it at http://localhost:3000');
});
