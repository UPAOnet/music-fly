'use strict';
var Player = (function () {
    function Player(TrackList, $scope, playerControls) {
        'ngInject';
        this.TrackList = TrackList;
        this.$scope = $scope;
        this.playerControls = playerControls;
        this.tracks = this.TrackList.currentTracks();
    }
    Player.prototype.playMusic = function () {
        this.playerControls.playMusic(this.song);
    };
    return Player;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
//# sourceMappingURL=PlayerButtons.controller.js.map