
'use strict'

const _ = require('lodash');

angular.module('musicApp')
 .factory('TrackList', TrackList)

/*@ngInject*/ function TrackList (
 songConstructor
 ) {
  var self = this;

  let TrackList = [];

  this.getSpotifyTracks = function (list) {

   _.map(list, function (each, i) {
     TrackList.push(
       new songConstructor(i, each.name, each.album.images[1].url, each.album.name, each.artists[0].name, each.duration_ms, 'spotify', null, each.preview_url, each.external_urls.spotify)
     );
   })
   // return TrackList;
  }

  this.currentTracks = function () {
   return TrackList;
  }

  return self;
 }
