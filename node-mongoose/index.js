const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  author: String,
  pages: {
    type: Number,
    min: 0,
    max: 500
  },
  release: {
    type: Number,
    max: new Date().getFullYear()
  },
  available: Boolean,
  genres: [{ type: String, enum: ['biography', 'technology', 'romance', 'drama'] }]
});

const Book = mongoose.model('Book', bookSchema);

mongoose
  .connect('mongodb://localhost:27017/node-mongoose-example', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB');

    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    console.log('Cleaned MongoDB');

    return Book.create({
      title: '1984',
      author: 'Clive Thompson',
      pages: 434,
      available: true,
      release: 2019,
      genres: ['biography', 'technology']
    });
  })
  .then(document => {
    console.log('Book has been created:', document);

    return Book.find();
  })
  .then(documents => {
    console.log('Listed all books from collection: ', documents);

    return Book.findById('5eb42726218afccee199073e');
  })
  .then(book => {
    console.log('Found book by its id: ', book);

    return Book.findOne({ pages: 334 });
  })
  .then(book => {
    console.log('Found book with a specific number of pages: ', book);

    // findOneAndUpdate
    return Book.findByIdAndUpdate('5eb42726218afccee199073e', { author: 'Oscar Wilde' });
  })
  .then(data => {
    // Note: value with each promise resolved is document before updating
    console.log('Updated book: ', data);

    // findOneAndDelete
    return Book.findByIdAndDelete('5eb4228babfc44ce555ae853');
  })
  .then(data => {
    console.log('Deleted book: ', data);

    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from MongoDB');
  })
  .catch(error => {
    console.log('There was an error.');
    console.log(error);
  });
