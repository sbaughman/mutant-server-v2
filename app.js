// Create references for libraries
var dotenv = require('dotenv');
var express = require('express');
var http = require('http');
var Firebase = require('firebase');
var twilio = require('twilio');
var mailgun = require('mailgun-js');

// Express server setup
var app = express();
var server = http.createServer(app);
dotenv.load();

// Authenticate Firebase
var ref = new Firebase(process.env.FIREBASE_URL);
ref.authWithCustomToken(process.env.FIREBASE_SECRET, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Login Succeeded!");
  }
});

// Authenticate Twilio and create Twilio client
var twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Send text when new text added on Firebase
var textsRef = ref.child('texts');
textsRef.on('child_added', function(snapshot) {
  var text = snapshot.val();
  twilioClient.messages.create({
    body: text.name + ', I am available to see you now. Please come to my office so we can discuss: "' + text.topic + '"',
    to: text.phoneNumber,
    from: process.env.TWILIO_NUMBER
  }, function(err, message) {
    if(err) {
        console.error(err.message);
    }
  });
});

// Authenticate mailgun and create mailgun client
var mailgunClient = mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});

// Send email when new email added on Firebase
var emailsRef = ref.child('emails');
emailsRef.on("child_added", function(snapshot) {
  var email = snapshot.val();
  var emailData = {
    from: '<postmaster@'  + process.env.MAILGUN_DOMAIN + '>',
    to: email.emailAddress,
    subject: 'Welcome to Mutant Office Hours',
    text: 'Thanks for signing up!'
  };
  mailgunClient.messages().send(emailData, function(error, body) {
    console.log(body);
    if (error) {
      console.log(error);
    };
  });
});

server.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
});
