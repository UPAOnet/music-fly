angular.module('musicApp')
  .factory('spotifySearch', ['$http', 'songConstructor', function ($http, songConstructor) {
      var search = {};
      search.makeRequest = function (input) {
        var query = JSON.stringify({queryInput: input})
        vm.tracks = [];
        $http({
          data: query,
          url: 'http://localhost:3000/spotify',
          method: 'POST',
        }).then(function success (response) {       
          trackResults = response.data.tracks.items;
          console.log(response);
          _.map(trackResults, function (each, i) {
            vm.tracks.push(
              new songConstructor(i, each.name, each.album.images[1].url, each.album.name, each.artists[0].name, each.duration_ms, 'Spotify', null, each.preview_url, each.external_urls.spotify)
            );
          }) 
        }) 
      } 
      return search;
    }])