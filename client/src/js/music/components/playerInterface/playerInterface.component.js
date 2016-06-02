'use strict';
var templateUrl = require('./player-interface.html');
var playerInterfaceController = (function () {
    function playerInterfaceController(TrackList, playerControls, $scope) {
        'ngInject';
        var _this = this;
        var self = this;
        this.playerControls = playerControls;
        this.$scope = $scope;
        this.TrackList = TrackList;
        this.currentTrack = null;
        this.$scope.$watchCollection(function () { return _this.playerControls.currentSongInfo; }, function (newData, oldData) {
            self.currentTrack = self.playerControls.currentSongInfo;
        });
    }
    return playerInterfaceController;
}());
exports.playerInterfaceComponent = {
    template: templateUrl,
    controller: playerInterfaceController
};
//# sourceMappingURL=playerInterface.component.js.map