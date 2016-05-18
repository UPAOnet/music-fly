require('./songList.component.js');
// require('./playButton.component.js');


angular.module('musicApp')
  .component('playButton', require('./playButton.component.js').default);
