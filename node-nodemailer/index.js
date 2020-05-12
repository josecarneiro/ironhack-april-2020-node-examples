const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

transporter
  .sendMail({
    from: `Demo App <${process.env.NODEMAILER_EMAIL}>`,
    to: 'ih174test@gmail.com',
    subject: 'Test email',
    // text: 'Lorem Ipsum'
    html: '<strong>Hello</strong> <em>world</em> <a href="http://localhost:3000">Verify email</a>'
  })
  .then(result => {
    console.log('Email was sent successfully.');
    console.log(result);
  })
  .catch(error => {
    console.log('There was an error sending the email.');
    console.log(error);
  });
