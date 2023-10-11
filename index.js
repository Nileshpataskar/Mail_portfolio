const express = require('express');
const cors=require("cors")
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();


app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nileshpataskars@gmail.com', // Replace with your Gmail email address
    pass: 'jnsc veie kicd geqh', // Replace with your Gmail password
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'nileshpataskars@gmail.com',
    subject: 'Portfolio Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

app.listen(3002, () => {
  console.log(`Server listening on port 3002`);
});
