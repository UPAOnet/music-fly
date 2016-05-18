'use strict';
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
var Player = (function () {
    function Player(TrackList, $scope, playerControls) {
        this.TrackList = TrackList;
        this.$scope = $scope;
        this.playerControls = playerControls;
    }
    return Player;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
//# sourceMappingURL=player.controller.js.map