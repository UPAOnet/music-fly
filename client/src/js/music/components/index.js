require('./songList.component.js');

angular.module('musicApp')
  .component('playButton', require('./playButton.component.ts').default);

angular.module('musicApp')
  .component('playerInterface', require('./playerInterface/playerInterface.component.ts').default);
