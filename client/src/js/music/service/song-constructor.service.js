angular.module('musicApp')
  .factory('songConstructor', [function () {

    return song;

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
      this.deleteAble = {
        state: false,
        changeState: function () {
          this.state = true;
        }
      }
    }

  }])
