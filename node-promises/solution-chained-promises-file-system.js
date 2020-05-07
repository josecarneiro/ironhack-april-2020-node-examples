const fs = require('fs');

let firstFileContents;
let secondFileContents;

fs.promises
  .readFile(__dirname + '/abc.txt', { encoding: 'utf-8' })
  .then(a => {
    console.log('Received data from file system');
    console.log(a);

    firstFileContents = a;

    return fs.promises.readFile(__dirname + '/def.txt', { encoding: 'utf-8' });
  })
  .then(b => {
    console.log('Received data from file system');
    console.log(b);

    secondFileContents = b;

    response.render('home', {
      firstFileContents,
      secondFileContents
    });

    return fs.promises.readFile(__dirname + '/gsdasdasdhi.txt', { encoding: 'utf-8' });
  })
  .then(thirdFileContents => {
    console.log('Received data from file system');
    console.log(thirdFileContents);

    return fs.promises.readFile(__dirname + '/klm.txt', { encoding: 'utf-8' });
  })
  .then(fourthFileContents => {
    console.log('Received data from file system');
    console.log(fourthFileContents);
  })
  .catch(error => {
    console.log('An error happened reading one of the files from file system.');
    console.log(error);
  })
  .finally(() => {
    console.log('this is probably going to run at the end...');
  });
