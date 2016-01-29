var SpotifyWebApi = require('spotify-web-api-node');
var express = require('express');
var spotify = express.Router()
var bodyParser = require('body-parser');
var parseText = bodyParser.text();
var parseJSON = bodyParser.json();

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

