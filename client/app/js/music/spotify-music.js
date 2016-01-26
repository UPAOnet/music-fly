angular.module('musicApp', [])

.controller('musicPlayer', ['$scope','$http', 'spotifySearch', 'playerControls', 
  function ($scope, $http, spotifySearch, playerControls) {
    vm = this; 
    vm.playerTitle;
    vm.playerArtist;
    vm.playerInfo;
    vm.tracks = {}; 
    $scope.spotifyQuery;
    $scope.pauseMusic = function () {
      playerControls.pause();
    }
    $scope.playMusic = function () {
      (playerControls.playMusic())
      $scope.$apply();
    } 
    $scope.spotifySearch = function () {
      spotifySearch.makeRequest($scope.spotifyQuery);
    }
    $scope.spotifySearchEnter = function () {
      if (event.keyCode === 13) {
        spotifySearch.makeRequest($scope.spotifyQuery);
      }
    }
    $scope.playMusic = function (song) {
      playerControls.playMusic(song);
    }
  }])

.factory('spotifySearch', ['$http', function ($http) {
    var search = {};
    search.makeRequest = function (input) {
      var query = JSON.stringify({queryInput: input})
      $http({
        data: query,
        url: 'http://localhost:3000/spotify',
        method: 'POST',
      }).then(function success (response) {
        vm.tracks = response.data.tracks.items;   
      }) 
    } 
    return search;
  }])

.factory('scSearch', [function () {
  var search = {};

  //   SC.get('/tracks', {
  //   q: 'Calvin Harris', limit: 20
  // }).then(function(tracks) {
  //   console.log(tracks);
  // });

}])

.factory('playerControls', ['$q', function ($q) {
    var currentList;    
    var player = new Audio(); 

    player.playMusic = function (song) {
      currentList = vm.tracks;
      _.each(currentList, function (eachSong) {
        if (eachSong.name === song) {
          vm.playerTitle = eachSong.name;
          vm.playerArtist = eachSong.artists[0].name;
          vm.playerInfo = eachSong.album.name;
          player.src = eachSong.preview_url;
          console.log(vm.playerTitle);
        }               
      })
      player.play()            
    }    
    return player
  }])

.directive('songList', () => {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      template: '<li class="songs" ng-repeat= "track in player.tracks" ng-click="song-select" data-song = {{track.name}}>' +
                '<img ng-src="{{track.album.images[2].url}}"/> {{track.name}} {{track.artists[0].name}} {{track.album.name}}' +
                '</li>',
      link: function (scope, elem, attrs) {
        elem.bind('click', function (event) {
          var song = event.target
          $('.songs').removeClass('highlight');
          song.classList.add('highlight');
        });

        elem.bind('dblclick', function (event) {
          var song = event.target.getAttribute('data-song')
          scope.playMusic(song);
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
//   // player.pause();
// });

// .controller('scController',  ['$scope', function ($scope) {
//       vm = this;
//       vm.test = 'this is sc';
//   }])






