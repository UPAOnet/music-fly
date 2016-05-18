require('./musicSearch.controller.js');




angular.module('musicApp')
  .controller('playerController', require('./player.controller.js').default)

angular.module('musicApp')
  .controller('SongListController', require('./SongList.controller.js').default)
