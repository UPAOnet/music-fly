angular.module('musicApp')
  .factory('scSearch', ['songConstructor', function (songConstructor) {
    
    var search = {
      allTracks: allTracks
    }; 

    return search

    function allTracks (input) {
      var query = input;
      return SC.get('/tracks', {q: query, limit: 20}); 
    };
    
  }])