require('./musicSearch.controller.js');




angular.module('musicApp')
  .controller('PlayerButtonsController', require('./PlayerButtons.controller.ts').default)

angular.module('musicApp')
  .controller('SongListController', require('./SongList.controller.ts').default)
