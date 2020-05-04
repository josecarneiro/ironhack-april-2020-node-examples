const http = require('http');

const server = http.createServer((request, response) => {
  console.log(request.url);
  console.log(request.method);
  console.log(request.headers);
  switch (request.url) {
    case '/jose':
      response.write('My name is José');
      break;
    case '/aline':
      response.write('Oi sou a Aline');
      break;
    case '/santi':
      response.write('Hola soy Santi');
      break;
    default:
      response.write("I don't know who I am");
  }
  response.end();
});

server.listen(3000);
