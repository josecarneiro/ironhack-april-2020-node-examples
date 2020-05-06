const express = require('express');

const app = express();

const Pokedex = require('pokedex');
const pokedex = new Pokedex();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
  const everyPokemon = [];
  for (let id = 1; id <= 151; id++) {
    everyPokemon.push(pokedex.pokemon(id));
  }
  response.render('list', {
    list: everyPokemon
  });
});

app.get('/:name', (request, response) => {
  const name = request.params.name;
  const pokemon = pokedex.pokemon(name);
  response.render('single', {
    pokemon: pokemon
  });
});

app.listen(3000, () => {
  console.log('App has started. Visit it at http://localhost:3000');
});
