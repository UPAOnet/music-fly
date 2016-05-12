angular.module('musicApp')
  .controller('musicPlayer', musicPlayer)

  musicPlayer.$inject = ['$scope','$http', 'spotifySearch', 'playerControls', 'scSearch', 'tabs', 'playlists', 'searchType', 'trackList'];

  function musicPlayer ($scope, $http, spotifySearch, playerControls, scSearch, tabs, playlists, searchType, trackList) {
      var vm = this;
      vm.tracks = [];
      vm.topArtists;
      vm.playlistTabs = playlists.currentPlaylists;
      vm.playerImage = 'assets/images/music-player/default-album.png';
      vm.playerTitle = 'Title';
      vm.playerArtist = 'Artist';
      vm.playerInfo = 'album';
      vm.playStateButton = 'play icon';
      vm.searchDisplay = searchType.searchState;
      vm.addPlaylistState = playlists.state.addField;
      vm.addPlaylistButton = playlists.state.addButton;

      SC.initialize({client_id: 'b10a9e77003de676a40bcd4ce7346f03'})

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

          let spotifyTracks = spotifySearch.makeRequest($scope.spotifyQuery);

          spotifyTracks.then(function success (response) {
            let trackResults = response.data.tracks.items;
            trackList.getTracks(trackResults);
            vm.tracks = trackList.currentTracks();
            console.log( vm.tracks );
           })
           
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
