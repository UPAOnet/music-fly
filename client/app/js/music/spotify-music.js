angular.module('musicApp', [])

  .controller('musicPlayer', ['$scope', function ($scope) {
    vm = this;
    // var button = document.getElementById('pauseBtn');
    // console.log(button);
    // button.addEventListener('click', function (event) {
    //   audio.pause();
    // })
    // $scope.playMusic = function () {
    //   musicControls.playMusic;
    // } 
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
        console.log(vm.tracks);     
      }) 
    } 
    return search;
  }])

  .factory('playerControls', [function (songList) {
    var player = new Audio('https://p.scdn.co/mp3-preview/2d89e5af25a276eaf6b9e56baef79a543263afab');
    // console.log(player.src)

    player.playMusic = function (event) {
      player.pause();
      player.src = currentSong
      player.play()
    }
    player.pauseMusic = function () {
      player.pause();
    }
    return player
  }])

  

//Directives 
  .directive('songList', () => {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      template: '<li class="songs" ng-repeat= "track in spotify.tracks" ng-click="song-select">' +
                '<img ng-src="{{track.album.images[2].url}}"/> {{track.name}} {{track.artists[0].name}} {{track.album.name}}' +
                '</li>',
      link: function (scope, elem, attrs) {
        elem.bind('click', function (event) {
          var song = event.target
          $('.songs').removeClass('highlight');
          song.classList.add('highlight');
        });

        elem.bind('dblclick', function (event) {
          audio.play();
        })
      }
    }
  })

SC.initialize({
  client_id: 'b10a9e77003de676a40bcd4ce7346f03'
})

// var audio = new Audio('https://api.soundcloud.com/tracks/143553285/stream')



SC.get('/tracks', {
  q: 'Calvin Harris', limit: 20
}).then(function(tracks) {
  console.log(tracks);
});

// SC.stream('/tracks/190452632').then(function(player){
//   player.play();
//   // player.pause();
// });








