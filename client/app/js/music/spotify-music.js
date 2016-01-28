angular.module('musicApp', [])

.controller('musicPlayer', ['$scope','$http', 'spotifySearch', 'playerControls', 'scSearch',
  function ($scope, $http, spotifySearch, playerControls, scSearch) {
    vm = this; 
    vm.playerImage = 'assets/images/music-player/default-album.png';
    vm.playerTitle;
    vm.playerArtist;
    vm.playerInfo;
    vm.tracks = []; 
    $scope.spotifyQuery;
    $scope.scQuery;   
    vm.playStateButton = 'play icon';

    vm.digest = function () {
      $scope.$digest()
    }

    vm.togglePlay = function () {
      playerControls.togglePlay();
    }
    
    $scope.playMusic = function (song) {      
      playerControls.playMusic(song);

    }
    
    $scope.scSearch = function () {
      scSearch.allTracks($scope.scQuery);
      $scope.scQuery = "";
    }
    $scope.scSearchEnter = function () {
      if (event.keyCode === 13) {
        scSearch.allTracks($scope.scQuery);
        $scope.scQuery = "";
      };
    }
    $scope.spotifySearch = function () {
      spotifySearch.makeRequest($scope.spotifyQuery);
      $scope.spotifyQuery = "";
    }
    $scope.spotifySearchEnter = function () {
      if (event.keyCode === 13) {
        spotifySearch.makeRequest($scope.spotifyQuery);
        $scope.spotifyQuery = "";
      }
    }    
  }])


.service('songConstructor', [function () {
  function song (name, image, album, artist, duration, company, fetchSource, urlSource, pageSource) {
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
        _.map(trackResults, function (each) {
          vm.tracks.push(
            new songConstructor(each.name, each.album.images[2].url, each.album.name, each.artists[0].name, each.duration_ms, 'spotify', null, each.preview_url, each.external_urls.spotify)
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
        // console.log(stream);
        // console.log(url);        
        vm.tracks.push(new songConstructor(each.title, each.artwork_url, each.album, each.user.username, each.duration, 'sc', each.stream_url, url, each.permalink_url))
        vm.digest()
      });
    })    
  };
  return search
}])

.factory('playerControls', [function () { 
    var masterPlayer = new Audio();
    function companyBrand (song, client) {
      if (song.company === 'sc') {
        return 'https://api.soundcloud.com/tracks/' + song.urlSource + '/stream?client_id=' + client;
      }
      else if (song.company === 'spotify') {
        return song.urlSource;
      }
    };

    masterPlayer.playState = {
      playing: false
    }

    masterPlayer.toggleState = function () {
      if (masterPlayer.playState.playing === false) {
        masterPlayer.playState.playing = true;
        vm.playStateButton = 'pause icon';
        console.log(masterPlayer.playState)
        vm.digest();
        return
      }
      if (masterPlayer.playState.playing === true) {
        masterPlayer.playState.playing = false;
        vm.playStateButton = 'play icon';
        console.log(masterPlayer.playState)
        vm.digest();
        return
      }
    }

    masterPlayer.togglePlay = function () {
      if (masterPlayer.src === '') {return};
      if (masterPlayer.playState.playing === false) {
        masterPlayer.play();
        masterPlayer.toggleState();
        return 
      }
      if (masterPlayer.playState.playing === true) {
        masterPlayer.pause();
        masterPlayer.toggleState();
        return 
      }
    }

    masterPlayer.playMusic = function (song) {
      var scClient = 'b10a9e77003de676a40bcd4ce7346f03';
      _.each(vm.tracks, function (eachSong) {
        if (eachSong.name === song) {
          vm.playerImage = eachSong.image;
          vm.playerTitle = eachSong.name;
          vm.playerArtist = eachSong.artist;
          vm.playerInfo = eachSong.album;
          masterPlayer.src = companyBrand(eachSong, scClient);
          vm.digest();
          (masterPlayer.playState.playing === false) ? masterPlayer.togglePlay() : masterPlayer.play();          
        }
      })
    }
    return masterPlayer
  }])


.directive('songList', () => {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      template: '<li class="songs" ng-repeat= "track in player.tracks" ng-click="song-select" data-song = {{track.name}} data-company ={{track.company}}>' +
                '<img ng-src="{{track.image}}"/> {{track.name}} {{track.artist}} {{track.album}}' +
                '</li>',
      link: function (scope, elem, attrs) {
        elem.bind('click', function (event) {
          var song = event.target
          $('.songs').removeClass('highlight');
          song.classList.add('highlight');
        });
        elem.bind('dblclick', function (event) {
          var song = event.target.getAttribute('data-song');
          scope.playMusic(song);
        })
      }
    }
  })

SC.initialize({
  client_id: 'b10a9e77003de676a40bcd4ce7346f03'
})
































         

