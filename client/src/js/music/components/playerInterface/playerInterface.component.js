'use strict';
var playerInterfaceController = (function () {
    function playerInterfaceController(TrackList, playerControls, $scope) {
        this.playerInterfaceComponent = {
            templateUrl: '../templates/player-interface.html',
            controller: playerInterfaceController
        };
        this.default = playerInterfaceComponent;
        this.TrackList = TrackList;
        var currentTrack = null;
        this.getInfo();
    }
    return playerInterfaceController;
}());
//# sourceMappingURL=playerInterface.component.js.map