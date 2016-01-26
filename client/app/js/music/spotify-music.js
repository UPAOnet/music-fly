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
    $scope.playMusic = function (song) {
      playerControls.playMusic(song);
   
    } 

    $scope.scSearch = function () {
      // console.log('bound');
      scSearch.allTracks();
      // console.log(vm.tracks);
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

.service('listConstructor', [function () {
  function song (name, image, album, artist, duration, urlSource) {
    this.name = name;
    this.image = image;
    this.album = album;
    this.artist = artist;
    this.duration = duration;
    this.urlSource = urlSource;
  }
  return song; 
}])

.factory('spotifySearch', ['$http', 'listConstructor', function ($http, listConstructor) {
    var search = {};
    search.makeRequest = function (input) {
      var query = JSON.stringify({queryInput: input})
      $http({
        data: query,
        url: 'http://localhost:3000/spotify',
        method: 'POST',
      }).then(function success (response) {

        trackResults = response.data.tracks.items;
        _.map(trackResults, function (each) {
          vm.tracks.push(
            new listConstructor(each.name, each.album.images[2].url, each.album.name, each.artists[0].name, each.duration, each.preview_url)
          );
        })
        console.log(vm.tracks);  
      }) 
    } 
    return search;
  }])

.factory('scSearch', [function () {
  var search = {};
  search.allTracks = function () {
    SC.get('/tracks', {q: 'Calvin Harris', limit: 20}).then(function(tracks) {
      vm.tracks = tracks;
      _.map(vm.tracks, function (each) {
        console.log(each);
      })
    })
  };

  return search
}])

.factory('playerControls', ['$q', function ($q) {  
    var player = new Audio(); 

    player.playMusic = function (song) {
      _.each(vm.tracks, function (eachSong) {
        if (eachSong.name === song) {
          // vm.playerTitle = eachSong.name;
          // vm.playerArtist = eachSong.artists[0].name;
          // vm.playerInfo = eachSong.album.name;
          player.src = eachSong.urlSource;
          // console.log(vm.playerTitle);
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
          // console.log(scope.playMusic);
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




// SC.get('/tracks', {q: 'Calvin Harris', limit: 20}).then(function(tracks){console.log(tracks)})

