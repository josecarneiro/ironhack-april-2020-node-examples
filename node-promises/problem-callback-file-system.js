const fs = require('fs');

fs.readFile(__dirname + '/abc.txt', { encoding: 'utf-8' }, (error, data) => {
  if (error) {
    console.log('An error happened reading from file system.');
    console.log(error);
  } else {
    console.log('Received data from file system');
    console.log(data);
    fs.readFile(__dirname + '/def.txt', { encoding: 'utf-8' }, (error, data) => {
      if (error) {
        console.log('An error happened reading from file system.');
        console.log(error);
      } else {
        console.log('Received data from file system');
        console.log(data);
      }
    });
  }
});
