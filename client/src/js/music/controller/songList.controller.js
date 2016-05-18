'use strict';

angular.module('musicApp')
  .controller('songListController', songListController)

 /*ngInject*/ function songListController (
 TrackList
) {
  const vm = this;

  vm.tracks = TrackList.currentTracks();

  vm.addTrack = function (trackKey, playlist) {
    playlists.addTrack(trackKey, playlist);

  }

}
