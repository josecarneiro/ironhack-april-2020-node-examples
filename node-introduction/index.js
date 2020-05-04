const sum = require('./sum');

console.log('Hello World');

console.log(sum(3, 4));

const operations = require('./operations');

console.log(operations.divide(10, 2));
console.log(operations.multiply(12, 27));

console.log(operations);

const Pokedex = require('pokedex');

const pokedex = new Pokedex();

console.log(pokedex.pokemon(272));
