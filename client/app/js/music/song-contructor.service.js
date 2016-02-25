angular.module('musicApp')
  .service('songConstructor', [function () {
    function song (key, name, image, album, artist, duration, company, fetchSource, urlSource, pageSource) {
      this.key = key;
      this.name = name;
      this.image = image;
      this.album = album;
      this.artist = artist;
      this.duration = duration;
      this.company = company; 
      this.fetchSource = fetchSource;
      this.urlSource = urlSource;
      this.pageSource = pageSource;
    }

    (song.prototype.deleteAble = function () {
      var state = {
        deleteAble: false
      }
      function changeState () {
        if(state.deleteAble === false) {
          console.log('test')
        }
      }

      return {
        changeState: changeState
      }
    }())

    return song; 
  }])