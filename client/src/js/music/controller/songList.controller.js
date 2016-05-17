'use strict';

angular.module('musicApp')
  .controller('songListController', songListController)

 /*ngInject*/ function songListController (
 trackList
) {
  const vm = this;

  vm.tracks = trackList.currentTracks();

  vm.addTrack = function (trackKey, playlist) {
    playlists.addTrack(trackKey, playlist);
    // vm.digest();
  }

}
