'use strict';


class

//  /*ngInject*/ function player (
//  TrackList,
//  $scope,
//  playerControls
// ) {
//   const vm = this;
//
//   vm.tracks = TrackList.currentTracks();
//
//   vm.playMusic = function () {
//
//     playerControls.playMusic(vm.song.urlSource);
//   };
//
// }
//
// export default player

class Player {
  private tracks;

  constructor (TrackList, $scope, playerControls) {
    this.TrackList = TrackList;
    this.$scope = $scope;
    this.playerControls = playerControls;
  }

}
