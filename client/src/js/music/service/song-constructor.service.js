angular.module('musicApp')
  .factory('songConstructor', ['numberConverter', function (numberConverter) {
  
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

    /**
     * Changes duration of song. Used for song previews
     * @param {length} - Preview length of song in milliseconds
     */
    song.prototype.setPreviewLength = function (length) {
      let seconds = numberConverter.convertToSeconds(length, 'milliseconds');
      this.duration = seconds;
    }

    return song;

  }])
