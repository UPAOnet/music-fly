'use strict';

  const playButton = {
   templateUrl: './templates/play-button.html',
   controller: 'PlayerButtonsController',
   bindings: {
    song:'<',
    // changes look depending on where it is
    roleType: '@',
    //Index position of song for playing state
    index: '<'
   }
}

export default playButton
