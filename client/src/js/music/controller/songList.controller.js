'use strict';
//  /*ngInject*/ function SongListController (
//  TrackList
// ) {
//   const vm = this;
//
//   vm.tracks = TrackList.currentTracks();
//
//   vm.addTrack = function (trackKey, playlist) {
//     playlists.addTrack(trackKey, playlist);
//
//   }
//
// }
//
var SongListController = (function () {
    // private trackKey: any;
    // private playList: any;
    function SongListController(TrackList) {
        this.TrackList = TrackList;
        this.tracks = TrackList.currentTracks();
    }
    return SongListController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SongListController;
//# sourceMappingURL=SongList.controller.js.map