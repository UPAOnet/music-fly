var SpotifyWebApi = require('spotify-web-api-node');
    express = require('express');
    spotify = express.Router()
    bodyParser = require('body-parser');
    parseText = bodyParser.text();

var spotifyApi = new SpotifyWebApi()

spotify.get('/search/tracks', function (req, res) {
  spotifyApi.searchTracks('Love')
    .then(function(data) {
      console.log('Search by "Love"', data);
    }, function(err) {
      console.error(err);
    });
})



// spotifyApi.get('/' , function (req, res) {
//   console.log('GET REQUEST')
// })

module.exports = spotify;




// // search artists whose name contains 'Love'
// spotifyApi.searchArtists('Love')
//   .then(function(data) {
//     console.log('Search artists by "Love"', data);
//   }, function(err) {
//     console.error(err);
//   });