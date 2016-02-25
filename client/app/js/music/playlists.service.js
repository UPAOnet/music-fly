angular.module('musicApp')
  .factory('playlists', ['playlistConstructor', function (playlistConstructor) {
    var playlist = {};
    var samplePlaylist = new playlistConstructor('My Playlist');
    playlist.currentPlaylists = [samplePlaylist];

    playlist.state = {
      addField: false,
      addButton: true,
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
          // eachTrack.deleteAble.changeState();
          // console.log(eachTrack.deleteAble.state)
          var removedDuplicates = _.uniq(currentPlaylist.tracks);
          currentPlaylist.tracks = removedDuplicates;
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
      playlist.state.addField = false;
      playlist.state.addButton = true;
    }
    return playlist;
  }])