angular.module('musicApp')
  .service('playlistConstructor', [function () {
    function playlist (name) {
      this.name = name;
      this.tracks = [];
    }
    return playlist
  }])