angular.module('musicApp')
  .service('songConstructor', [function () {
    function song (key, name, image, album, artist, duration, company, fetchSource, urlSource, pageSource) {
      this.key = key;
      this.name = name;
      this.image = image;
      this.album = album;
      this.artist = artist;
      this.duration = duration;
      this.company = company; 
      this.fetchSource = fetchSource;
      this.urlSource = urlSource;
      this.pageSource = pageSource;
    }
    return song; 
  }])
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
  .factory('scSearch', ['songConstructor', function (songConstructor) {
    var search = {}; 
    search.allTracks = function (input) {
      var query = input;
      function getUrl (urlStream) {
        if (urlStream.length === 50) {
          return urlStream.slice(-16, -7);
        }
        else if (urlStream.length === 49) {
          return urlStream.slice(-15, -7)
        }
      }
      SC.get('/tracks', {q: query, limit: 20}).then(function(tracks) { 
        vm.tracks = [];    
        var trackResults = tracks;      
        _.map(trackResults, function (each, i) {
          var stream = each.stream_url;
          var url = getUrl(stream);       
          vm.tracks.push(new songConstructor(i, each.title, each.artwork_url, each.album, each.user.username, each.duration, 'SoundCloud', each.stream_url, url, each.permalink_url))       
        });
        vm.digest()
      })    
    };
    return search
  }])