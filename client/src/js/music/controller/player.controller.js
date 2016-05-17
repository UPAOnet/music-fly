'use strict';

angular.module('musicApp')
  .controller('playerController', player)

 /*ngInject*/ function player (
 trackList,
 $scope,
 playerControls
) {
  const vm = this;

  vm.tracks = trackList.currentTracks();

  vm.playMusic = function () {
    // var song = event.target.getAttribute('data-song');
    // console.log(vm.song);
    playerControls.playMusic(vm.song);
  }
}
