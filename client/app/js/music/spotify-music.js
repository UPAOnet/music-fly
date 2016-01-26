angular.module('musicApp', [])

.controller('musicPlayer', ['$scope','$http', 'spotifySearch', 'playerControls', 'scSearch',
  function ($scope, $http, spotifySearch, playerControls, scSearch) {
    vm = this; 
    vm.playerTitle;
    vm.playerArtist;
    vm.playerInfo;
    vm.tracks = []; 

    $scope.spotifyQuery;
    $scope.scQuery;

    $scope.pauseMusic = function () {
      playerControls.pause();
    }
    $scope.playSpotifyMusic = function (song) {
      playerControls.playSpotifyMusic(song);
   
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
  function song (name, image, album, artist, duration, source, urlSource, pageSource) {
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
    SC.get('/tracks', {q: query, limit: 20}).then(function(tracks) {
      vm.tracks = [];
      var trackResults = tracks;
      _.map(trackResults, function (each) {
        vm.tracks.push(
          new songConstructor(each.title, each.artwork_url, each.album, each.user.username, each.duration, 'sc', each.stream_url, each.permalink_url)
        )
      })
      console.log(vm.tracks); 
    })
  };
  return search
}])

.factory('playerControls', [function () {  
    var player = new Audio(); 

    player.playSpotifyMusic = function (song) {
      _.each(vm.tracks, function (eachSong) {
        if (eachSong.name === song) {
          vm.playerTitle = eachSong.name;
          vm.playerArtist = eachSong.artist;
          vm.playerInfo = eachSong.album;
          player.src = eachSong.urlSource;
        }               
      })
      player.play()            
    }

    player.playSoundCloud = function (song) {

    }

    return player
  }])

.directive('songList', () => {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      template: '<li class="songs" ng-repeat= "track in player.tracks" ng-click="song-select" data-song = {{track.name}}>' +
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
          scope.playSpotifyMusic(song);
        })
      }
    }
  })

SC.initialize({
  client_id: 'b10a9e77003de676a40bcd4ce7346f03'
})

// var audio = new Audio('https://api.soundcloud.com/tracks/143553285/stream')





// SC.stream('/tracks/190452632').then(function(player){

//   player.play();
//   console.log(SC.stream);
//   // player.pause();
// });

// SC.get('/tracks', {q: 'Calvin Harris', limit: 20}).then(function(tracks){console.log(tracks)})

