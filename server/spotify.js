var SpotifyWebApi = require('spotify-web-api-node');
    express = require('express');
    spotify = express.Router()
    bodyParser = require('body-parser');
    parseText = bodyParser.text();
    parseJSON = bodyParser.json();

var spotifyApi = new SpotifyWebApi()

spotify.post('/', parseJSON, function (req, res) {
  var query = req.body
  console.log(query)
  spotifyApi.searchTracks(query)
    .then(function(data) {
      res.send(data.body);
    }, function(err) {
      console.error(err);
    });
})



// spotify.get('/' , function (req, res) {
//   res.send('data');
// });

module.exports = spotify;




// // search artists whose name contains 'Love'
// spotifyApi.searchArtists('Love')
//   .then(function(data) {
//     console.log('Search artists by "Love"', data);
//   }, function(err) {
//     console.error(err);
//   });