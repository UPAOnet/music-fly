angular.module('musicApp')
  .factory('scSearch', ['songConstructor', function (songConstructor) {
    
    var search = {
      allTracks: allTracks
    }; 

    return search

    function allTracks (input) {
      var query = input;

      // function getUrl (urlStream) {
      //   if (urlStream.length === 50) {
      //     return urlStream.slice(-16, -7);
      //   }
      //   else if (urlStream.length === 49) {
      //     return urlStream.slice(-15, -7)
      //   }
      // }
      
      return SC.get('/tracks', {q: query, limit: 20});
      // SC.get('/tracks', {q: query, limit: 20}).then(function(tracks) { 
      //   let searchResuts = [];    
      //   var trackResults = tracks;      
      //   _.map(trackResults, function (each, i) {
      //     var stream = each.stream_url;
      //     var url = getUrl(stream);       
      //     searchResults.tracks.push(new songConstructor(i, each.title, each.artwork_url, each.album, each.user.username, each.duration, 'soundcloud', each.stream_url, url, each.permalink_url))       
      //   });
      // })    
    };
    
  }])