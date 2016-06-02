'use strict';
var templateUrl = require('./player-interface.html');
var playerInterfaceController = (function () {
    function playerInterfaceController(TrackList, playerControls, $scope) {
        'ngInject';
        var _this = this;
        this.title = 'Title';
        this.artist = 'Artist';
        this.album = 'Album';
        this.playerControls = playerControls;
        this.$scope = $scope;
        this.TrackList = TrackList;
        this.currentTrack = null;
        this.$scope.$watchCollection(function () { return _this.playerControls.currentSongInfo; }, function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            _this.currentTrack = _this.playerControls.currentSongInfo;
            _this.updateInfo();
        });
    }
    playerInterfaceController.prototype.updateInfo = function () {
        this.title = this.currentTrack.name;
        this.artist = this.currentTrack.artist;
        this.album = this.currentTrack.album;
    };
    return playerInterfaceController;
}());
exports.playerInterfaceComponent = {
    template: templateUrl,
    controller: playerInterfaceController
};
//# sourceMappingURL=playerInterface.component.js.map