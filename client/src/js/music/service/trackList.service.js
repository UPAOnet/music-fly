
'use strict'

const _ = require('lodash');

angular.module('musicApp')
 .factory('TrackList', TrackList)

/*@ngInject*/ function TrackList (
 songConstructor
 ) {
  var factory = {};
  let list = [];

  let trackState = {
    current: null,
    previous: null,
    next: null
  }

  factory.currentTracks = () => list;

  factory.setActive = function (songIndex) {
    trackState.current = songIndex;
  }

  factory.getSpotifyTracks = function (spotifyList) {

   _.forEach(spotifyList, function (each, i) {
     let theSong = new songConstructor(
        i, 
        each.name, 
        each.album.images[1].url, 
        each.album.name, 
        each.artists[0].name, 
        each.duration_ms, 
        'spotify', 
        null, 
        each.preview_url, 
        each.external_urls.spotify
      )
      
    theSong.setPreviewLength(30000); 
    list.push(theSong);
   })
  }

  return factory;
 }
