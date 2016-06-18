

// Create references for libraries
var express = require('express');
var http = require('http');
var Firebase = require('firebase');

// Express server setup
var app = express();
var server = http.createServer(app);

// Authenticate Firebase



server.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
});
