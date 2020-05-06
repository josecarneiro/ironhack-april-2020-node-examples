const fs = require('fs');

fs.promises
  .readFile(__dirname + '/abc.txt', { encoding: 'utf-8' })
  .then(data => {
    console.log('Received data from file system');
    console.log(data);
  })
  .catch(error => {
    console.log('An error happened reading from file system.');
    console.log(error);
  });
