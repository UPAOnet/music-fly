'use strict';

  const playButton = {
   templateUrl: './templates/play-button.html',
   controller: 'PlayerButtonsController',
   bindings: {
    song:'<',
    // Why role type again?
    roleType: '@',
    //Index position of song for playing state
    index: '<'
   }
}

export default playButton
