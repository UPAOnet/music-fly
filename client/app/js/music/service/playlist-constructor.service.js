angular.module('musicApp')
  .factory('playlistConstructor', [function () {
    function playlist (name) {
      this.name = name;
      this.tracks = [];
    }
    return playlist
  }])