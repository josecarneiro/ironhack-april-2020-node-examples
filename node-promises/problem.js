console.log('a');

setTimeout(() => {
  console.log('b');
  setTimeout(() => {
    console.log('c');
    setTimeout(() => {
      console.log('d');
      setTimeout(() => {
        console.log('e');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
