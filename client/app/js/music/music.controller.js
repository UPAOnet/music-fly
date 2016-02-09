angular.module('musicApp')
  .controller('musicPlayer', ['$scope','$http', 'spotifySearch', 'playerControls', 'scSearch', 'tabs', 'playlists', 'searchType', 'voice',
    function ($scope, $http, spotifySearch, playerControls, scSearch, tabs, playlists, searchType, voice) {
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
        }
      }
      vm.openDropDown = function () {
        console.log('drop it')
        $('.ui.dropdown').dropdown('restore defaults'); 
        vm.diest();
      } 
      vm.addTrack = function (trackKey, playlist) {
        playlists.addTrack(trackKey, playlist);
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
        };
      }   
      vm.spotifySearchEnter = function () {
        if (event.keyCode === 13) {
          var attribute = event.target.getAttribute('data-tab');
          tabs.switchTabs(attribute);
          spotifySearch.makeRequest($scope.spotifyQuery);
          $scope.spotifyQuery = "";
        }
      }
      $scope.playMusic = function (event) { 
        var song = event.target.getAttribute('data-song');     
        playerControls.playMusic(song);
      }    
  }])