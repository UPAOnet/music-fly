angular.module('musicApp')

  .factory('spotifySearch', /*@ngIneject*/ function (
   $http,
   songConstructor,
   trackList
  ) {
      var search = {
        makeRequest: makeRequest
      };

     return search;

      function makeRequest (input) {
        var query = JSON.stringify({queryInput: input})
        return $http({
          data: query,
          url: '/spotify',
          method: 'POST'
        })
      }
    })
