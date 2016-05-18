'use strict';

  const playButton = {
   templateUrl: './templates/play-button.html',
   controller: 'playerController',
   bindings: {
    song:'<',
    roleType: '@'
   }
}

export default playButton
