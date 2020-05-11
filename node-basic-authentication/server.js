const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    // ...
    app.listen(process.env.PORT);
  })
  .catch(error => {
    console.log(error);
  });
