angular.module('musicApp')
  .factory('songConstructor', ['numberConverter', function (numberConverter) {
  
    function song (
      key, 
      name, 
      image, 
      album, 
      artist, 
      duration, 
      company, 
      fetchSource, 
      urlSource, 
      pageSource
      ) {
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
        this.deleteAble = false;
        this.viewDuration = this.setViewDuration(this.duration);
    }

    /**
     * Changes duration of song. Used for song previews
     * @param {length} - Preview length of song in milliseconds
     */
    song.prototype.setPreviewLength = function (length) {
      this.duration = length;
      this.viewDuration = '0:30';
    };

    /**
     * Puts the song in a deleteable state
     */
    song.prototype.deleteAble = function () {
      this.deleteAble = true;
    };

    /**
     * Puts the song in a deleteable state
     */
    song.prototype.deleteAble = function () {
      this.deleteAble = true;
    };

    /**
     * Changes duration into a viewable state
     */
    song.prototype.setViewDuration = function (duration) {
      var milliseconds = duration;
      var time = milliseconds / 1000;
      var minutes = Math.floor(time / 60);
      var seconds =  Math.floor(time - (minutes * 60));

      if (seconds < 10) {
        seconds = '0' + seconds;
      }

      return minutes + ':' + seconds;


    };

    return song;

  }])
