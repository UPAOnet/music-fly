angular.module('musicApp')
  .factory('playlistConstructor', [function () {

    return playlist

    function playlist (name) {
      this.name = name;
      this.tracks = [];
    }
    
  }])