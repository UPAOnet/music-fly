'use strict';
var templateUrl = require('./play-button.html');
exports.playButton = {
    template: templateUrl,
    controller: 'PlayerButtonsController',
    bindings: {
        song: '<',
        roleType: '@',
        index: '<'
    }
};
//# sourceMappingURL=playButton.component.js.map