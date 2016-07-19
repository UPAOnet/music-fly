
'use strict'

const _ = require('lodash');

angular.module('musicApp')
 .factory('TrackList', TrackList)

/*@ngInject*/ function TrackList (
 songConstructor
 ) {
  var factory = {};

  // Contains songs to populate track list
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

  factory.formatTracks = function (spotifyList, config) {
   let searchList = [];

   _.forEach(spotifyList, function (each, i) {
     let theSong = new songConstructor(
        i, 
        each.name, 
        each.album.images[1].url, 
        each.album.name, 
        each.artists[0].name, 
        each.duration, 
        'spotify', 
        null, 
        each.preview_url, 
        each.external_urls.spotify
      )

    theSong.setPreviewLength(30000); 
    searchList.push(theSong);
    list = searchList;
   })

   return list;
  }

  return factory;
 }
