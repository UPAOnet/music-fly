angular.module('musicApp')

  .factory('spotifySearch', /*@ngIneject*/ function (
   $http,
   songConstructor,
   TrackList,
   apiUtils
  ) {
      var search = {
        makeRequest: makeRequest
      };

     return search;

      function makeRequest (input) {
        var query = JSON.stringify({queryInput: input})
        return $http({
          data: query,
          url: `https://api.spotify.com/v1/search?q=${input}&type=track&limit=20`,
          method: 'GET'
        })
      }
    })
