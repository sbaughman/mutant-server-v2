// Create references for libraries
var express = require('express');
var http = require('http');
var Firebase = require('firebase');

// Express server setup
var app = express();
var server = http.createServer(app);

// Authenticate Firebase
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");
ref.authWithCustomToken(AUTH_TOKEN, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Login Succeeded!", authData);
  }
});

server.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
});
