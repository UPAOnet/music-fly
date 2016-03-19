angular.module('musicApp')
  .factory('playlists', ['playlistConstructor', function (playlistConstructor) {
    

    var samplePlaylist = new playlistConstructor('My Playlist');

    var playlist = {
      addTrack: addTrack,
      createNewPlaylist: createNewPlaylist,
      displayTracks: displayTracks,
      removeTrack: removeTrack,
      revealAddField: revealAddField,    
      state: {
        addField: false,
        addButton: true
      }
    };

    playlist.currentPlaylists = [samplePlaylist];

    return playlist;

    function revealAddField () {
        playlist.state.addField = true;
        playlist.state.addButton = false;
      }

    function addTrack (trackKey, playlist) {
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

    function removeTrack (trackId) {
      vm.tracks.forEach(function (track, i) {
        if (track.key === trackId) {
          vm.tracks.splice(i, 1);
        }
      }) 
    }

    function displayTracks (playlist) {
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

    function createNewPlaylist (name) {
      var newPlaylist = new playlistConstructor (name);
      
      playlist.currentPlaylists.push(newPlaylist);
      playlist.state.addField = false;
      playlist.state.addButton = true;
    }
    
  }])