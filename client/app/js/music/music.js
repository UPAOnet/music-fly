angular.module('musicApp', [])

.controller('musicPlayer', ['$scope','$http', 'spotifySearch', 'playerControls', 'scSearch', 'tabs', 'playlists', 'searchType',
  function ($scope, $http, spotifySearch, playerControls, scSearch, tabs, playlists, searchType) {
    vm = this;
    vm.topArtists;
    vm.tracks = [];
    vm.playlistTabs = playlists.currentPlaylists;
    vm.playerImage = 'assets/images/music-player/default-album.png';
    vm.playerTitle = 'Title';
    vm.playerArtist = 'Artist';
    vm.playerInfo = 'album';
    vm.playStateButton = 'play icon';
    vm.searchDisplay = searchType.searchState; 
    vm.brandDisplay =      
    $scope.spotifyQuery;
    $scope.scQuery; 
    $scope.newPlaylist; 
    
    vm.digest = function () {
      _.defer(function() {
        $scope.$digest();
      })
    }
    vm.togglePlay = function () {
      playerControls.togglePlay();
    } 
    vm.changeSearch = function (event) {
      var attribute = event.target.getAttribute('data-search');
      searchType.changeSearch(attribute)
    }

    vm.addTrack = function (track, playlist) {
      playlists.addTrack(track, playlist);
    } 

    vm.switchTabs = function (event, playlist) {
      var attribute = event.target.getAttribute('data-tab');
      var isPlaylist = event.target.getAttribute('data-playlist');
      if (isPlaylist) {
        playlists.displayTracks(playlist);     
      }
      tabs.switchTabs(attribute);
    }
    vm.createNewPlaylist = function () {
      if ($scope.newPlaylist === "" || $scope.newPlaylist === undefined) {
        alert('please enter playlist name')
        return 
      }
      playlists.createNewPlaylist($scope.newPlaylist);
      $scope.newPlaylist= "";
    }
    
     
    $scope.playMusic = function (event) { 
      // console.log('linked')
      var song = event.target.getAttribute('data-song');     
      playerControls.playMusic(song);
    }    
    
    $scope.scSearchEnter = function () {            
      if (event.keyCode === 13) {
        var attribute = event.target.getAttribute('data-tab');
        tabs.switchTabs(attribute);
        scSearch.allTracks($scope.scQuery);
        $scope.scQuery = "";
      };
    }   
    $scope.spotifySearchEnter = function () {
      if (event.keyCode === 13) {
        var attribute = event.target.getAttribute('data-tab');
        tabs.switchTabs(attribute);
        spotifySearch.makeRequest($scope.spotifyQuery);
        $scope.spotifyQuery = "";
      }
    }
    // $scope.spotifySearch = function () {
    //   spotifySearch.makeRequest($scope.spotifyQuery);
    //   $scope.spotifyQuery = "";
    // }
    // $scope.scSearch = function () {
    //   scSearch.allTracks($scope.scQuery);
    //   $scope.scQuery = "";
    // }    
  }])

.factory('searchType', [function () {
  var search = {};
  search.searchState = {
    sc: true,
    spotify: false
  };
  search.changeSearch = function (attribute) {
    if (attribute === 'sc' && search.searchState.sc === false) {
      search.searchState.sc = true;
      search.searchState.spotify = false;
    }
    else if (attribute === 'spotify' && search.searchState.spotify === false) {
      search.searchState.spotify = true;
      search.searchState.sc = false;
    }
  }
  return search
}])

.factory('playlistCreator', [function () {
  var makePlaylist = {};
  makePlaylist.state = {
    playlistField: false,
    addButton: true
  }

}])

.factory('playlists', ['playlistConstructor', function (playlistConstructor) {
  var playlist = {};
  var samplePlaylist = new playlistConstructor('sample');
  playlist.currentPlaylists = [samplePlaylist];

  playlist.addTrack = function (track, playlist) {
    var currentPlaylist;
    _.map(vm.playlistTabs, function findPlaylist (eachPlaylist) {
      if (eachPlaylist.name === playlist) {
        currentPlaylist = eachPlaylist;        
      }
    })
    _.map(vm.tracks, function findTrack (eachTrack) {
      if (eachTrack.name === track) {
        currentPlaylist.tracks.push(eachTrack);
      }
    })
  }

  playlist.displayTracks = function (playlist) {
    vm.tracks = [];
    _.map(vm.playlistTabs, function findTrackList (eachPlaylist) {
      if (eachPlaylist.name === playlist) {
        vm.tracks = eachPlaylist.tracks;
      }
    })
  }

  playlist.createNewPlaylist = function (name) {
    var newPlaylist = new playlistConstructor (name);
    playlist.currentPlaylists.push(newPlaylist);
  }
  return playlist;
}])

.factory('tabs', [function () {
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
  function playlist (name) {
    this.name = name;
    this.tracks = [];
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
            new songConstructor(each.name, each.album.images[1].url, each.album.name, each.artists[0].name, each.duration_ms, 'Spotify', null, each.preview_url, each.external_urls.spotify)
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
        vm.tracks.push(new songConstructor(each.title, each.artwork_url, each.album, each.user.username, each.duration, 'SoundCloud', each.stream_url, url, each.permalink_url))       
      });
      vm.digest()
    })    
  };
  return search
}])

.factory('playerControls', [function () { 
    var masterPlayer = new Audio();
    function getSong (song, client) {
      if (song.company === 'SoundCloud') {
        return 'https://api.soundcloud.com/tracks/' + song.urlSource + '/stream?client_id=' + client;
      }
      else if (song.company === 'Spotify') {
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







