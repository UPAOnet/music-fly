'use strict';

angular.module('musicApp')
  .component('playButton', {
   templateUrl: './templates/play-button.html',
   controller: 'playerController',
   bindings: {
    song:'<'
   }
})
