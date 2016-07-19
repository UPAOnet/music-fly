/* Handles search functionality */

class Controller {
  private tracks: any;
  private searchQuery: string;

  constructor (
    private $scope,
    private $q,
    private spotifySearch,
    private scSearch,
    private searchType,
    private musicEvents,
    private TrackList,
    private $window
  ) {
    'ngInject';

    this.$window.SC.initialize({client_id: 'b10a9e77003de676a40bcd4ce7346f03'})
  }


  /**
   * Emits search results 
   * @event NEW_SEARCH
   */
  private emitSearchResults (songList) {
    this.$scope.$emit(this.musicEvents.newSearch, songList);
  } 

  /**
   * Search functionality
   * {event} - Enter keypress event
   */
    public search (event) {
      let spotifyTracks;
      let soundcloudTracks;    

      if (event.keyCode === 13) {
        Promise.all([this.spotifySearchQuery(), this.soundCloudSearchQuery()])

          .then( (results) => {
            spotifyTracks = this.TrackList.formatTracks(results[0].data.tracks.items);
            soundcloudTracks = results[1];
            console.log(results);
            this.tracks = spotifyTracks;
            this.searchQuery = ""
            this.emitSearchResults(this.tracks);
        })
      }      
    }

  /**
   * Search functionality for spotify songs
   */
  public spotifySearchQuery () {
    let spotifyTracks = this.spotifySearch.makeRequest(this.searchQuery);

    return spotifyTracks  
  }

  /**
   * Search for soundcloud
   */
  private soundCloudSearchQuery = function () {
      this.scSearch.allTracks(this.searchQuery);
      // $scope.scQuery = "";
      // if ($(window).width() < 870) {
      //   $('#player-menu').hide();
      // }
  };
}

export const MusicSearch = {
  templateUrl: require('./musicSearch.html'),
  controller: Controller
}


//   musicSearch.$inject = ['$scope','$http', 'spotifySearch', 'playerControls', 'scSearch', 'tabs', 'playlists', 'searchType', 'TrackList'];
//
//   function musicSearch ($scope, $http, spotifySearch, playerControls, scSearch, tabs, playlists, searchType, TrackList) {
//       var vm = this;
//       vm.tracks = [];
//       vm.topArtists;
//       vm.playlistTabs = playlists.currentPlaylists;
//       vm.playerImage = 'assets/images/music-player/default-album.png';
//       vm.playerTitle = 'Title';
//       vm.playerArtist = 'Artist';
//       vm.playerInfo = 'album';
//       vm.playStateButton = 'play icon';
//       vm.searchDisplay = searchType.searchState;
//       vm.addPlaylistState = playlists.state.addField;
//       vm.addPlaylistButton = playlists.state.addButton;
//
//
//
//       $scope.spotifyQuery;
//       $scope.scQuery;
//       $scope.newPlaylist;
//

//
//       vm.changeSearch = function (event) {
//         var attribute = event.target.getAttribute('data-search');
//         searchType.changeSearch(attribute)
//       }
//       vm.switchTabs = function (event, playlist) {
//         var attribute = event.target.getAttribute('data-tab');
//         var isPlaylist = event.target.getAttribute('data-playlist');
//         if (isPlaylist) {
//           playlists.displayTracks(playlist);
//         }
//         tabs.switchTabs(attribute);
//       }
//       vm.revealNewPlaylist = function () {
//         playlists.revealAddField();
//         vm.addPlaylistState = playlists.state.addField;
//         vm.addPlaylistButton = playlists.state.addButton;
//       }
//       vm.createNewPlaylist = function (event) {
//         if(event.keyCode === 13) {
//           if ($scope.newPlaylist === "" || $scope.newPlaylist === undefined) {
//             alert('please enter playlist name')
//             return;
//           }
//           playlists.createNewPlaylist($scope.newPlaylist);
//           $scope.newPlaylist= "";
//           vm.addPlaylistState = playlists.state.addField;
//           vm.addPlaylistButton = playlists.state.addButton;
//           vm.digest();
//         }
//       }
//       vm.openDropDown = function () {
//         $('.ui.dropdown').dropdown('restore defaults');
//         vm.digest();
//       }
//       vm.addTrack = function (trackKey, playlist) {
//         playlists.addTrack(trackKey, playlist);
//         vm.digest();
//       }
//       vm.removeTrack = function (trackId) {
//         playlists.removeTrack(trackId);
//       }
//
//       vm.scSearchEnter = function () {
//         if (event.keyCode === 13) {
//           var attribute = event.target.getAttribute('data-tab');
//           tabs.switchTabs(attribute);
//           scSearch.allTracks($scope.scQuery);
//           $scope.scQuery = "";
//           if ($(window).width() < 870) {
//             $('#player-menu').hide();
//           }
//         };
//       }
//
//       vm.spotifySearchEnter = function () {
//         if (event.keyCode === 13) {
//           var attribute = event.target.getAttribute('data-tab');
//           tabs.switchTabs(attribute);
//
//           let spotifyTracks = spotifySearch.makeRequest($scope.spotifyQuery);
//
//           spotifyTracks.then(function success (response) {
//             let trackResults = response.data.tracks.items;
//             TrackList.getSpotifyTracks(trackResults);
//             vm.tracks = TrackList.currentTracks();
//             console.log( vm.tracks );
//            })
//
//           $scope.spotifyQuery = "";
//         }
//       }
//
//
//   }
