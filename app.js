// Create references for libraries
var dotenv = require('dotenv');
var express = require('express');
var http = require('http');
var Firebase = require('firebase');
var twilio = require('twilio');

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
    console.log("Login Succeeded!", authData);
  }
});

// Authenticate Twilio and create Twilio client
var twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Listen for new texts being created on Firebase
var textsRef = ref.child('texts');
textsRef.on('child_added', function(snapshot) {
  console.log(snapshot.val());
})

server.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
});
