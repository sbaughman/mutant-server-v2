// Create references for libraries
var dotenv = require('dotenv');
var express = require('express');
var http = require('http');
var Firebase = require('firebase');

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

server.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
});
