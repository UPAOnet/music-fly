'use strict';
var SongListController = (function () {
    function SongListController(TrackList) {
        'ngInject';
        this.TrackList = TrackList;
        this.tracks = TrackList.currentTracks();
    }
    return SongListController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SongListController;
//# sourceMappingURL=SongList.controller.js.map