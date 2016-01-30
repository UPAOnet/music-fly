angular.module('musicApp', [])

.controller('musicPlayer', ['$scope','$http', 'spotifySearch', 'playerControls', 'scSearch', 'switchTabs', 'playlists',
  function ($scope, $http, spotifySearch, playerControls, scSearch, switchTabs, playlists) {
    vm = this;
    vm.topArtists;
    vm.tracks = [];
    vm.playlistTabs = playlists.currentPlaylists;
    vm.playerImage = 'assets/images/music-player/default-album.png';
    vm.playerTitle = 'Title';
    vm.playerArtist = 'Artist';
    vm.playerInfo = 'album';
    vm.playStateButton = 'play icon';        
    $scope.spotifyQuery;
    $scope.scQuery; 
    $scope.newPlaylist; 
    
    vm.digest = function () {
      _.defer(function() {
        $scope.$digest();
      })
    }

    vm.switchTabs = function (event) {
      var attribute = event.target.getAttribute('data-tab');
      switchTabs.switchTabs(attribute);
    }
    vm.createNewPlaylist = function () {
      if ($scope.newPlaylist === "" || $scope.newPlaylist === undefined) {
        alert('please enter playlist name')
        return 
      }
      playlists.createNewPlaylist($scope.newPlaylist);
      $scope.newPlaylist= "";
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

.factory('playlists', ['playlistConstructor', function (playlistConstructor) {
  var playlist = {};
  playlist.currentPlaylists = [{
    name: 'sample'
  }];

  playlist.createNewPlaylist = function (name) {
    var newPlaylist = new playlistConstructor (name);
    playlist.currentPlaylists.push(newPlaylist);
    console.log(vm.playlistTabs)
  }
  return playlist;
}])

.factory('switchTabs', [function () {
  var tabSwitcher = {};

  tabSwitcher.switchTabs = function (tabAttribute) {
    var allPages = document.getElementsByClassName('music-page');
    var allTabs = document.getElementsByClassName('music-tab');    
    for (var i =0; i<allPages.length; i++) {
      allPages[i].classList.add('hidden');
      allTabs[i].classList.remove('highlight');
      if (allPages[i].getAttribute('data-page') === tabAttribute) {
        allPages[i].classList.remove('hidden');
        allTabs[i].classList.add('highlight');
      }
    }
  }
  return tabSwitcher;
}])

.service('playlistConstructor', [function () {
  function playlist (name, tracks) {
    this.name = name;
    this.tracks = tracks;
  }
  return playlist
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
        vm.tracks.push(new songConstructor(each.title, each.artwork_url, each.album, each.user.username, each.duration, 'sc', each.stream_url, url, each.permalink_url))       
      });
      vm.digest()
    })    
  };
  return search
}])

.factory('playerControls', [function () { 
    var masterPlayer = new Audio();
    function getSong (song, client) {
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
      }
      else if (masterPlayer.playState.playing === true) {
        masterPlayer.playState.playing = false;
        vm.playStateButton = 'play icon';
        
      }
    }

    masterPlayer.togglePlay = function () {
      var scClient = 'b10a9e77003de676a40bcd4ce7346f03';
      if (vm.tracks.length > 1 && masterPlayer.src === '') {
        masterPlayer.src = getSong(vm.tracks[0], scClient);
        vm.playerImage = vm.tracks[0].image;
        vm.playerTitle = vm.tracks[0].name;
        vm.playerArtist = vm.tracks[0].artist;
        vm.playerInfo = vm.tracks[0].album;        
      }
      else if (masterPlayer.src === '') {
        return
      };      
      (masterPlayer.playState.playing === false) ? masterPlayer.play() : masterPlayer.pause();
      masterPlayer.toggleState();
    }

    masterPlayer.playMusic = function (song) {
      var scClient = 'b10a9e77003de676a40bcd4ce7346f03';
      _.each(vm.tracks, function (eachSong) {
        if (eachSong.name === song) {
          vm.playerImage = eachSong.image;
          vm.playerTitle = eachSong.name;
          vm.playerArtist = eachSong.artist;
          vm.playerInfo = eachSong.album;
          masterPlayer.src = getSong(eachSong, scClient);          
          (masterPlayer.playState.playing === false) ? masterPlayer.togglePlay() : masterPlayer.play();
          vm.digest();
        }
      })
    }
    return masterPlayer
  }])

.directive('songList', function () {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      templateUrl: 'templates/track-list.html',
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







