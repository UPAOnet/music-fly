angular.module('musicApp', [])

  .controller('musicPlayer', ['$scope', 'playerControls', function ($scope, playerControls) {
    vm = this;        
    $scope.pauseMusic = function () {
      playerControls.pause();
    }
    $scope.playMusic = function () {
      playerControls.playMusic();
    } 
  }])
  .controller('scController',  ['$scope', function ($scope) {
      vm = this;
      vm.test = 'this is sc';
  }])
  .controller('spotifyController', ['$scope', '$http', 'spotifySearch', 'playerControls', function ($scope, $http, spotifySearch, playerControls) {
    vm = this;
    vm.tracks = {};
    $scope.query = '';
    $scope.spotifySearch = function () {
      spotifySearch.makeRequest($scope.query)
    };
    $scope.playMusic = function (song) {
      playerControls.playMusic(song);
    }
  }]) 

  

// Factories 
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

  .factory('playerControls', [function () {
    var currentList;    
    var player = new Audio();   
    player.playMusic = function (song) {
      currentList = vm.tracks;
      _.each(currentList, function (eachSong) {
        if (eachSong.name === song) {
          source = eachSong.preview_url;
          player.src = eachSong.preview_url;
        }       
      })
      currentList = vm.tracks;
      player.pause();
      player.play();
    }
    return player
  }])

  

//Directives 
  .directive('songList', () => {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      template: '<li class="songs" ng-repeat= "track in spotify.tracks" ng-click="song-select" data-song = {{track.name}}>' +
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
          // console.log(song);

        })
      }
    }
  })

SC.initialize({
  client_id: 'b10a9e77003de676a40bcd4ce7346f03'
})

// var audio = new Audio('https://api.soundcloud.com/tracks/143553285/stream')



// SC.get('/tracks', {
//   q: 'Calvin Harris', limit: 20
// }).then(function(tracks) {
//   console.log(tracks);
// });

// SC.stream('/tracks/190452632').then(function(player){
//   player.play();
//   // player.pause();
// });








