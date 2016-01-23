var express = require('express');
              SoundCloud = require('node-soundcloud');
              sc = express.Router();
              bodyParser = require('body-parser');
              parseText = bodyParser.text();
              parseJSON = bodyParser.json();

SoundCloud.init({
  id: 'b10a9e77003de676a40bcd4ce7346f03',
  secret: 'c646a0208bbe196dc2aee0d8dc5198f7',
  uri: 'http://localhost:3000/sc/welcome'
});

// sc.get('/sclogin', function (req, res) {
//   var url = SoundCloud.getConnectUrl(); 
//   res.writeHead(301, url);
//   res.end();
// })

sc.get('/welcome', function (req, res) {
  console.log('welcome to soundcloud');
});






module.exports = sc;