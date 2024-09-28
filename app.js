const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Create a new express application
const app = express();

// Use the bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());




// app.use(cors({
//   origin: 'http://localhost:3000'
// }));


app.use(cors({
  origin: 'https://flex-trips.vercel.app'
}));



app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// Define a route for sending an email
app.post('/send-email', (req, res) => {

  console.log(req.url);
  
  // Get the subject and recipient email address from the request body
  const { subject, recipient, message } = req.body;

  // Create a transporter object that will handle the sending of the email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'parkezy17@gmail.com',
        pass: 'oz**********ox',
      }
  });

  // Define the email message
  const mailOptions = {
    from: 'parkezy17@gmail.com',
    to: recipient,
    subject: subject,
    text: message
  };

  // Use the transporter object to send the email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});



// Start the express server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
