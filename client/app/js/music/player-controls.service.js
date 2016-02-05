angular.module('musicApp')
  .factory('playerControls', [function () { 
    var masterPlayer = new Audio();

    function getSong (song, client) {
      if (song.company === 'SoundCloud') {
        return 'https://api.soundcloud.com/tracks/' + song.urlSource + '/stream?client_id=' + client;
      }
      else if (song.company === 'Spotify') {
        return song.urlSource;
      }
    };
    function setCurrent (currentSong) {
      var songKey = currentSong.key;
      masterPlayer.playState.currentSong = songKey;
      console.log(masterPlayer.playState.currentSong);
      // console.log(songKey)
    }

    masterPlayer.playState = {
      playing: false,
      currentSong: null
    }

    masterPlayer.nextSong = function () {
      if(masterPlayer.playState.playing === true && vm.tracks.length) {
        
      }
    }

    masterPlayer.toggleState = function () {
      if (masterPlayer.playState.playing === false) {
        masterPlayer.playState.playing = true;
        vm.playStateButton = 'pause icon';
      }
      else if (masterPlayer.playState.playing === true) {
        masterPlayer.playState.playing = false;
        vm.playStateButton = 'play icon';
        
      }
    }

    masterPlayer.voicePlay = function () {
      if (masterPlayer.playState.playing === false) {
        masterPlayer.play();
        masterPlayer.toggleState();
        vm.digest();
      }      
    }

    masterPlayer.voicePause = function () {
      console.log(masterPlayer.playState.playing)
      if (masterPlayer.playState.playing === true) {
        masterPlayer.pause();
        masterPlayer.toggleState();
        vm.digest();
      }      
    }

    masterPlayer.togglePlay = function () {
      var scClient = 'b10a9e77003de676a40bcd4ce7346f03';
      if (vm.tracks.length > 1 && masterPlayer.src === '') {
        masterPlayer.src = getSong(vm.tracks[0], scClient);
        vm.playerImage = vm.tracks[0].image;
        vm.playerTitle = vm.tracks[0].name;
        vm.playerArtist = vm.tracks[0].artist;
        vm.playerInfo = vm.tracks[0].album; 
        setCurrent(vm.tracks[0]);
      }
      else if (masterPlayer.src === '') {
        return
      };      
      (masterPlayer.playState.playing === false) ? masterPlayer.play() : masterPlayer.pause();
      masterPlayer.toggleState();
      vm.digest();
    }

    masterPlayer.playMusic = function (song) {
      var scClient = 'b10a9e77003de676a40bcd4ce7346f03';
      _.each(vm.tracks, function (eachSong) {
        if (eachSong.name === song) {
          vm.playerImage = eachSong.image;
          vm.playerTitle = eachSong.name;
          vm.playerArtist = eachSong.artist;
          vm.playerInfo = eachSong.album;
          masterPlayer.src = getSong(eachSong, scClient);          
          (masterPlayer.playState.playing === false) ? masterPlayer.togglePlay() : masterPlayer.play();
          vm.digest();
        }
      })
    }
    return masterPlayer
  }])