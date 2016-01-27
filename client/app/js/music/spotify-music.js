angular.module('musicApp', [])

.controller('musicPlayer', ['$scope','$http', 'spotifySearch', 'playerControls', 'scSearch',
  function ($scope, $http, spotifySearch, playerControls, scSearch) {
    vm = this; 
    vm.playerTitle;
    vm.playerArtist;
    vm.playerInfo;
    vm.tracks = []; 
    vm.scPlayer = {};
    $scope.spotifyQuery;
    $scope.scQuery;
    $scope.playMusic = function () {      
      vm.scPlayer.player.play();
    }
    $scope.pauseMusic = function () {
      vm.scPlayer.player.pause();
    }
    $scope.playSpotifyMusic = function (song) {
      // vm.scPlayer.player.pause();
      playerControls.playSpotifyMusic(song);   
    } 
    $scope.playSoundCloud = function (song) {
      playerControls.playSoundCloud(song);
      // playerControls.playSoundCloud(song).then(function (player) {
        
      // });   
    }


    $scope.scSearch = function () {
      scSearch.allTracks($scope.scQuery);
    }
    $scope.scSearchEnter = function () {
      if (event.keyCode === 13) {
        scSearch.allTracks($scope.scQuery);
      };
    }


    $scope.spotifySearch = function () {
      spotifySearch.makeRequest($scope.spotifyQuery);

    }
    $scope.spotifySearchEnter = function () {
      if (event.keyCode === 13) {
        spotifySearch.makeRequest($scope.spotifyQuery);
      }
    }    
  }])

.service('songConstructor', [function () {
  function song (name, image, album, artist, duration, source, urlSource, pageSource, scPause) {
    this.name = name;
    this.image = image;
    this.album = album;
    this.artist = artist;
    this.duration = duration;
    this.source = source; 
    this.urlSource = urlSource;
    this.pageSource = pageSource;
  }
  return song; 
}])



.factory('spotifySearch', ['$http', 'songConstructor', function ($http, songConstructor) {
    var search = {};
    search.makeRequest = function (input) {
      var query = JSON.stringify({queryInput: input})
      $http({
        data: query,
        url: 'http://localhost:3000/spotify',
        method: 'POST',
      }).then(function success (response) {
        vm.tracks = [];
        trackResults = response.data.tracks.items;
        // console.log(trackResults);
        _.map(trackResults, function (each) {
          vm.tracks.push(
            new songConstructor(each.name, each.album.images[2].url, each.album.name, each.artists[0].name, each.duration_ms, 'spotify', each.preview_url, each.external_urls.spotify)
          );
        })
        // console.log(vm.tracks);  
      }) 
    } 
    return search;
  }])

.factory('scSearch', ['songConstructor', function (songConstructor) {
  var search = {}; 

  search.allTracks = function (input) {
    var query = input;
    
    function getUrl (urlStream) {
      // console.log(urlStream);
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
      
      _.map(trackResults, function (each) {
        var stream = each.stream_url;
        var url = getUrl(stream); 
        // console.log(url);
        SC.stream('/tracks/' + url).then(function (player) {
            vm.tracks.push(new songConstructor(each.title, each.artwork_url, each.album, each.user.username, each.duration, 'sc', player, each.permalink_url))
          });
      });
    })    
  };

  return search
}])

.factory('playerControls', [function () { 
    var masterPlayer = new Audio();
    masterPlayer.playSpotifyMusic = function (song) {

      _.each(vm.tracks, function (eachSong) {
        if (eachSong.name === song) {
          vm.playerTitle = eachSong.name;
          vm.playerArtist = eachSong.artist;
          vm.playerInfo = eachSong.album;
          masterPlayer.src = eachSong.urlSource;
        }               
      })
      masterPlayer.play()            
    }

    masterPlayer.playSoundCloud = function (song) {

      _.each(vm.tracks, function (eachSong) {

        // eachSong.urlSource.reset();       
        if (eachSong.name === song) {
          vm.scPlayer.player = eachSong.urlSource;
          console.log(vm.scPlayer);
          masterPlayer.pause();
          vm.playerTitle = eachSong.name;
          vm.playerArtist = eachSong.artist;
          vm.playerInfo = eachSong.album;
          
          eachSong.urlSource.play();
        };
      });
    };

    return masterPlayer
  }])


.directive('songList', () => {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      template: '<li class="songs" ng-repeat= "track in player.tracks" ng-click="song-select" data-song = {{track.name}} data-source ={{track.source}}>' +
                '<img ng-src="{{track.image}}"/> {{track.name}} {{track.artist}} {{track.album}}' +
                '</li>',
      link: function (scope, elem, attrs) {
        elem.bind('click', function (event) {
          var song = event.target
          $('.songs').removeClass('highlight');
          song.classList.add('highlight');
        });

        elem.bind('dblclick', function (event) {
          var song = event.target.getAttribute('data-song')
          if (event.target.getAttribute('data-source') === 'sc') {
            scope.playSoundCloud(song);
            // console.log('this is a sc song')

          }
        })
      }
    }
  })

SC.initialize({
  client_id: 'b10a9e77003de676a40bcd4ce7346f03'
})


































         

