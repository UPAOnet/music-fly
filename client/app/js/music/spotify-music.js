angular.module('musicApp', [])

  .controller('musicPlayer', ['$scope', function ($scope) {
    vm = this;
    var button = document.getElementById('pauseBtn')
    console.log(button)
    button.addEventListener('click', function (event) {
      audio.pause();
})
    // $scope.playMusic = function () {
    //   musicControls.playMusic;
    // } 
  }])
  .controller('scController',  ['$scope', function ($scope) {
      vm = this;
      vm.test = 'this is sc';
  }])
  .controller('spotifyController', ['$scope', '$http', 'spotifySearch', function ($scope, $http, spotifySearch) {
    vm = this;
    vm.tracks = {};
    $scope.query = '';
    $scope.spotifySearch = function () {
      spotifySearch.makeRequest($scope.query)
    };
  }]) 
  // })

  // .factory('playerControls', [function () {
  //   var player = new Audio();
  //   console.log('factory');

  //   player.playMusic = function () {
  //     player.play()
  //   }
  //   player.pauseMusic = function () {
  //     player.pause();
  //   }
  //   return player
  // }])

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
        // console.log(response);     
      }) 
    } 
    return search;
  }])

  

//Directives 
  .directive('songList', () => {
    return {
      restrict: 'A',
      replace: false,
      template: '<li class="songs" ng-repeat= "track in spotify.tracks" ng-click="song-select">' +
                '{{track.name}} {{track.artists[0].name}} {{track.album.name}}' +
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

var audio = new Audio('https://p.scdn.co/mp3-preview/2d89e5af25a276eaf6b9e56baef79a543263afab')

// SC.initialize({
//   client_id: 'b10a9e77003de676a40bcd4ce7346f03'
// })

// SC.get('/tracks', {
//   q: 'Calvin Harris', limit: 20
// }).then(function(tracks) {
//   console.log(tracks);
// });

// SC.stream('/tracks/190452632').then(function(player){
//   player.play();
//   player.pause();
// });








