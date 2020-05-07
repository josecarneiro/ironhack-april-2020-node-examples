const fs = require('fs');

fs.promises
  .readFile(__dirname + '/abc.txt', { encoding: 'utf-8' })
  .then(firstFileContents => {
    console.log('Received data from file system');
    console.log(firstFileContents);

    fs.promises
      .readFile(__dirname + '/def.txt', { encoding: 'utf-8' })
      .then(secondFileContents => {
        console.log('Received data from file system');
        console.log(secondFileContents);

        response.render('home', {
          firstFileContents,
          secondFileContents
        });
      })
      .catch(error => {
        console.log('An error happened reading from file system.');
        console.log(error);
      });
  })
  .catch(error => {
    console.log('An error happened reading from file system.');
    console.log(error);
  });
