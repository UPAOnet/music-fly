angular.module('musicApp', []);
$(document).ready(function () {  
  $('.artist-box').dimmer({
    on: 'hover'
  })
  $(window).resize(function () {
    if ($(window).width() < 870) {
      $('#player-menu').hide();
    }
    else if ($(window).width() > 870) {
      $('#player-menu').show();       
    }
  })
})




angular.module('musicApp')
  .controller('musicPlayer', musicPlayer)
    
  musicPlayer.$inject = ['$scope','$http', 'spotifySearch', 'playerControls', 'scSearch', 'tabs', 'playlists', 'searchType', 'voice'];

  function musicPlayer ($scope, $http, spotifySearch, playerControls, scSearch, tabs, playlists, searchType, voice) {
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
      vm.addPlaylistState = playlists.state.addField;
      vm.addPlaylistButton = playlists.state.addButton; 
      vm.annyang = voice.initialize();  
      vm.SC = SC.initialize({client_id: 'b10a9e77003de676a40bcd4ce7346f03'})  
      
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
      vm.playNext = function () {
        playerControls.nextSong();
      }
      vm.playPrevious = function () {
        playerControls.previousSong();
      }
      vm.voicePlay = function () {
        playerControls.voicePlay();
      }
      vm.voicePause = function () {
        playerControls.voicePause();
      } 
      vm.voiceStart = function () {
        playerControls.voiceStart();
      }     
      vm.changeSearch = function (event) {
        var attribute = event.target.getAttribute('data-search');
        searchType.changeSearch(attribute)
      }
      vm.switchTabs = function (event, playlist) {
        var attribute = event.target.getAttribute('data-tab');
        var isPlaylist = event.target.getAttribute('data-playlist');
        if (isPlaylist) {
          playlists.displayTracks(playlist);     
        }
        tabs.switchTabs(attribute);
      }    
      vm.revealNewPlaylist = function () {
        playlists.revealAddField();
        vm.addPlaylistState = playlists.state.addField;
        vm.addPlaylistButton = playlists.state.addButton;
      }
      vm.createNewPlaylist = function (event) {
        if(event.keyCode === 13) {
          if ($scope.newPlaylist === "" || $scope.newPlaylist === undefined) {
            alert('please enter playlist name')
            return;
          }
          playlists.createNewPlaylist($scope.newPlaylist);
          $scope.newPlaylist= "";
          vm.addPlaylistState = playlists.state.addField;
          vm.addPlaylistButton = playlists.state.addButton;
          vm.digest();
        }
      }
      vm.openDropDown = function () {
        $('.ui.dropdown').dropdown('restore defaults'); 
        vm.digest();
      } 
      vm.addTrack = function (trackKey, playlist) {
        playlists.addTrack(trackKey, playlist);
        vm.digest();
      } 
      vm.removeTrack = function (trackId) {
        playlists.removeTrack(trackId);
      }          
      vm.voiceSearch = function (query) {
        var attribute = 'search';
          tabs.switchTabs(attribute);
          scSearch.allTracks(query);
          $scope.scQuery = "";
      }
      vm.scSearchEnter = function () {            
        if (event.keyCode === 13) {
          var attribute = event.target.getAttribute('data-tab');
          tabs.switchTabs(attribute);
          scSearch.allTracks($scope.scQuery);
          $scope.scQuery = "";
          if ($(window).width() < 870) {
            $('#player-menu').hide();
          }
        };
      }   
      vm.spotifySearchEnter = function () {
        if (event.keyCode === 13) {
          var attribute = event.target.getAttribute('data-tab');
          tabs.switchTabs(attribute);
          spotifySearch.makeRequest($scope.spotifyQuery);
          $scope.spotifyQuery = "";
          if ($(window).width() < 870) {
            $('#player-menu').hide();
          }
        }
      }

      $scope.playMusic = function (event) { 
        var song = event.target.getAttribute('data-song');     
        playerControls.playMusic(song);
      }    
  }
angular.module('musicApp')
  .directive('songList', function () {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      templateUrl: 'templates/track-list.html',
      link: function (scope, elem, attrs) {
        elem.bind('click', function (event) {   
          $('.ui.dropdown').dropdown('restore defaults');            
        })
      }
    }
  })
angular.module('musicApp')
  .factory('playerControls', [function () { 
    
    var masterPlayer = new Audio();
    
    masterPlayer.playState = {
      playing: false,
      currentSong: null
    }

    function getSong (song) {
      scClient = 'b10a9e77003de676a40bcd4ce7346f03'
      if (song.company === 'soundcloud') {
        return 'https://api.soundcloud.com/tracks/' + song.urlSource + '/stream?client_id=' + scClient;
      }
      else if (song.company === 'spotify') {
        return song.urlSource;
      }
    };

    function setCurrent (currentSong) {
      var songKey = currentSong.key;
      masterPlayer.playState.currentSong = songKey;
    }

    function setPlayerInfo(currentSong) {
      vm.playerImage = currentSong.image;
      vm.playerTitle = currentSong.name;
      vm.playerArtist = currentSong.artist;
      vm.playerInfo = currentSong.album; 
    }
    
    masterPlayer.nextSong = function () {
      var current = masterPlayer.playState.currentSong;
      var next = current + 1;

      if (masterPlayer.playState.playing === true && vm.tracks[next]) {
        masterPlayer.src = getSong(vm.tracks[next]);
        setPlayerInfo(vm.tracks[next]);
        setCurrent(vm.tracks[next]);
        masterPlayer.play();
      }
      else if (!(vm.tracks[next])) {
        masterPlayer.src = getSong(vm.tracks[0]);
        setPlayerInfo(vm.tracks[0]);
        setCurrent(vm.tracks[0]);
        masterPlayer.play();
      }
    }

    masterPlayer.previousSong = function () {
      var current = masterPlayer.playState.currentSong;
      var previous = current - 1;
      
      if (masterPlayer.playState.playing === true && vm.tracks[previous]) {
        masterPlayer.src = getSong(vm.tracks[previous]);
        setPlayerInfo(vm.tracks[previous]);
        setCurrent(vm.tracks[previous]);
        masterPlayer.play();
      }
      else if (!(vm.tracks[previous])) {
        var lastTrack = vm.tracks[((0 - vm.tracks.length)*-1) - 1];
        masterPlayer.src = getSong(lastTrack);
        setPlayerInfo(lastTrack);
        setCurrent(lastTrack);
        masterPlayer.play();
      }
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
    masterPlayer.voicePlay = function () {
      if (masterPlayer.playState.playing === false) {
        masterPlayer.play();
        masterPlayer.toggleState();
        vm.digest();
      }      
    }

    masterPlayer.voicePause = function () {
      if (masterPlayer.playState.playing === true) {
        masterPlayer.pause();
        masterPlayer.toggleState();
        vm.digest();
      }      
    }

    masterPlayer.voiceStart = function () {
      if (vm.tracks.length > 1 && masterPlayer.playState.playing === false) {
        masterPlayer.src = getSong(vm.tracks[0]);
        setPlayerInfo(vm.tracks[0]); 
        setCurrent(vm.tracks[0]);
        masterPlayer.play();
        masterPlayer.toggleState();
        vm.digest();
      }
    }

    masterPlayer.togglePlay = function () {
      if (vm.tracks.length > 1 && masterPlayer.src === '') {
        masterPlayer.src = getSong(vm.tracks[0]);
        setPlayerInfo(vm.tracks[0]); 
        setCurrent(vm.tracks[0]);
      }
      else if (masterPlayer.src === '') {
        return
      };      
      (masterPlayer.playState.playing === false) ? masterPlayer.play() : masterPlayer.pause();
      masterPlayer.toggleState();
      vm.digest();
    }

    masterPlayer.playMusic = function (song) {
      _.each(vm.tracks, function (eachSong) {
        if (eachSong.name === song) {
          setCurrent(eachSong);   
          setPlayerInfo(eachSong);
          masterPlayer.src = getSong(eachSong);
          (masterPlayer.playState.playing === false) ? masterPlayer.togglePlay() : masterPlayer.play();
          vm.digest();
        }
      })
    }
    return masterPlayer
  }])
angular.module('musicApp')
  .service('playlistConstructor', [function () {
    function playlist (name) {
      this.name = name;
      this.tracks = [];
    }
    return playlist
  }])
angular.module('musicApp')
  .factory('playlists', ['playlistConstructor', function (playlistConstructor) {
    
    var playlist = {};
    var samplePlaylist = new playlistConstructor('My Playlist');
    playlist.currentPlaylists = [samplePlaylist];

    playlist.state = {
      addField: false,
      addButton: true
    }

    playlist.revealAddField = function () {
        playlist.state.addField = true;
        playlist.state.addButton = false;
      }

    playlist.addTrack = function (trackKey, playlist) {
      var currentPlaylist;

      _.map(vm.playlistTabs, function findPlaylist (eachPlaylist) {
        if (eachPlaylist.name === playlist) {
          currentPlaylist = eachPlaylist;        
        }
      })

      _.map(vm.tracks, function findTrack (eachTrack) {
        if (eachTrack.key === trackKey) {          
          currentPlaylist.tracks.push(eachTrack);
          var removedDuplicates = _.uniq(currentPlaylist.tracks);
          currentPlaylist.tracks = removedDuplicates;        
        }
      })
    }

    playlist.removeTrack = function (trackId) {
      vm.tracks.forEach(function (track, i) {
        if (track.key === trackId) {
          vm.tracks.splice(i, 1);
        }
      }) 
    }

    playlist.displayTracks = function (playlist) {
      vm.tracks = [];

      _.map(vm.playlistTabs, function (eachPlaylist, i) {
        if (eachPlaylist.name === playlist) {
          vm.tracks = eachPlaylist.tracks;
        }
      })

      _.map(vm.tracks, function (eachTrack, i) {
        eachTrack.deleteAble.changeState();
        eachTrack.key = i;
      })
    }

    playlist.createNewPlaylist = function (name) {
      var newPlaylist = new playlistConstructor (name);
      
      playlist.currentPlaylists.push(newPlaylist);
      playlist.state.addField = false;
      playlist.state.addButton = true;
    }
    return playlist;
  }])
angular.module('musicApp')
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
        _.map(trackResults, function (each, i) {
          var stream = each.stream_url;
          var url = getUrl(stream);       
          vm.tracks.push(new songConstructor(i, each.title, each.artwork_url, each.album, each.user.username, each.duration, 'soundcloud', each.stream_url, url, each.permalink_url))       
        });
        vm.digest()
      })    
    };
    return search
  }])
angular.module('musicApp')
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
  
angular.module('musicApp')
  .service('songConstructor', [function () {
    function song (key, name, image, album, artist, duration, company, fetchSource, urlSource, pageSource) {
      this.key = key;
      this.name = name;
      this.image = image;
      this.album = album;
      this.artist = artist;
      this.duration = duration;
      this.company = company; 
      this.fetchSource = fetchSource;
      this.urlSource = urlSource;
      this.pageSource = pageSource;
      this.deleteAble = {
        state: false,
        changeState: function () {
          this.state = true;
        }
      }
    }
    return song; 
  }])
angular.module('musicApp')
  .factory('spotifySearch', ['$http', 'songConstructor', function ($http, songConstructor) {
      var search = {};

      search.makeRequest = function (input) {
        var query = JSON.stringify({queryInput: input})
        this.tracks = [];

        $http({
          data: query,
          url: '/spotify',
          method: 'POST'
        }).then(function success (response) {       
          trackResults = response.data.tracks.items;
          _.map(trackResults, function (each, i) {
            vm.tracks.push(
              new songConstructor(i, each.name, each.album.images[1].url, each.album.name, each.artists[0].name, each.duration_ms, 'spotify', null, each.preview_url, each.external_urls.spotify)
            );
          })
        })
      } 
      return search;
    }])
angular.module('musicApp')
  .factory('tabs', [function () {
    var tabSwitcher = {};   
    tabSwitcher.switchTabs = function (tabAttribute) {
      var allPages = document.getElementsByClassName('music-page');
      var allTabs = document.getElementsByClassName('music-tab');    
      for (var i =0; i<allPages.length; i++) {
        allPages[i].classList.add('hidden');
        if (allPages[i].getAttribute('data-page') === tabAttribute) {
          allPages[i].classList.remove('hidden');
        }
      }
    }
  return tabSwitcher;
}])
angular.module('musicApp')
  .factory('voice', [function () {
    var voice = {};
    
    voice.initialize = function () {
      if (annyang) {
        var commands = {
          'search *query': function search (query) {
            vm.voiceSearch(query);
          },
          'start': function start () {
            vm.voiceStart();
          },
          'play': function play () {
            vm.voicePlay();
          },        
          'stop': function pause() {
            vm.voicePause();
          },
          ':nomatch': function none (message) {
            console.log('no recognized command')
            return
          }
        };
        annyang.addCommands(commands);
        // annyang.start();
      }  
    }
  return voice
}])
angular.module('musicApp')
  .controller('navController', navController); 

  navController.$inject = ['$scope', 'userLogin'];

  function navController ($scope, userLogin) {
    var vm = this;
    vm.loginName;
    vm.loginPassword;
    vm.currentUser;
    vm.test = "test";

    vm.login = function () {
      var login = userLogin.login(vm.loginName, vm.loginPassword);
      login.then(function (res) {
        if (res.status === 200) {
          var resData = JSON.parse(res.config.data);
          vm.currentUser = resData.userName;
        }
      })
    }
  } 
angular.module('musicApp')
  .directive('navBar', function () {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      templateUrl: 'templates/navigation.html',
      link: function (scope, elem, attrs) {

        $('.ui.modal').modal({
          allowMultiple: false
        })

        $('#sign-up-btn').click(function () {
          $('#sign-up-modal').modal('show')
        })

        $('#log-in-btn').click(function () {
          $('#log-in-modal').modal('show')
        })

        $('#player-toggle').click(function () {
          $('#player-menu').toggle('slide');
        })
      }
    }
  })
angular.module('musicApp')
  .factory('userLogin', ['$http', function ($http) {

    
    function login (userName, password) {

      var query = JSON.stringify({
        userName: userName,
        password: password
      })

       return $http({
        data: query,
        url: '/users/login',
        method: 'POST'
      })

    }

    return {
      login: login
    }

  }])