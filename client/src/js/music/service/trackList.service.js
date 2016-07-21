
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

  // Used for fetching soundcloud specifically
  function getUrl (urlStream) {
    if (urlStream.length === 50) {
      return urlStream.slice(-16, -7);
    }
    else if (urlStream.length === 49) {
      return urlStream.slice(-15, -7)
    }
  };


  factory.currentTracks = () => list;

  factory.setActive = function (songIndex) {
    trackState.current = songIndex;
  }

  factory.formatTracks = function (trackList, config) {
    let searchList = [];
    let configOptions = {
      spotify: 'spotify',
      soundcloud: 'soundcloud'
    }

    if (configOptions[config] === 'spotify') {

    _.forEach(trackList, function (each, i) {
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
    })
    return searchList;
    }

    if (configOptions[config] === 'soundcloud') {
      _.forEach(trackList, function (each, i) {
       let stream = each.stream_url;
       let url = getUrl(stream); 
       let theSong = new songConstructor(
          i, 
          each.title, 
          each.artwork_url, 
          each.album, 
          each.user.username, 
          each.duration, 
          'soundcloud', 
          each.stream_url,       
          url, 
          each.permalink_url
        )

        searchList.push(theSong);
        return searchList;
      })
      
    } else {
      throw 'Formatter needs a valid song origin to know what to format';
    }
  }

  return factory;
 }
