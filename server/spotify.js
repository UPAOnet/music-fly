var SpotifyWebApi = require('spotify-web-api-node');
    express = require('express');
    spotify = express.Router()
    bodyParser = require('body-parser');
    parseText = bodyParser.text();
    parseJSON = bodyParser.json();

var spotifyApi = new SpotifyWebApi()

spotify.post('/', parseJSON, function (req, res) {
  var query = req.body.queryInput
  console.log(query)
  spotifyApi.searchTracks(query)
    .then(function(data) {
      res.send(data.body);
    }, function(err) {
      console.error(err);
    });
})

module.exports = spotify;

