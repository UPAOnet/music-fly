require('./musicSearch.controller.js');
require('./songList.controller.js');



angular.module('musicApp')
  .controller('playerController', require('./player.controller.js').default)
