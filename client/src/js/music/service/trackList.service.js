
'use strict'

const _ = require('lodash');

angular.module('musicApp')
 .factory('trackList', trackList)

/*@ngInject*/ function trackList (
 songConstructor
 ) {
  var self = this;

  let trackList = [];

  this.getTracks = function (list) {

   _.map(list, function (each, i) {
     trackList.push(
       new songConstructor(i, each.name, each.album.images[1].url, each.album.name, each.artists[0].name, each.duration_ms, 'spotify', null, each.preview_url, each.external_urls.spotify)
     );
   })
   // return trackList;
  }

  this.currentTracks = function () {
   return trackList;
  }

  return self;
 }
