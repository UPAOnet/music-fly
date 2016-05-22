'use strict';

/**
 * Handles playing, pausing, & skipping logic.
 * Contains the state for what should be playing
 * @module playerControls
 */

angular.module('musicApp')
  .factory('playerControls', /*@ngInject*/ function (
    TrackList
  ) {

    var masterPlayer = new Audio();

    masterPlayer.currentSongInfo = {
      name: null,
      artist: null,
      album: null,
      image: null,
      company: null
    }

    masterPlayer.playState = {
      playing: false,
      currentSong: null
    };

    // function getSong (song) {
    //   // scClient = 'b10a9e77003de676a40bcd4ce7346f03'
    //   if (song.company === 'soundcloud') {
    //     return 'https://api.soundcloud.com/tracks/' + song.urlSource + '/stream?client_id=' + scClient;
    //   }
    //   if (song.company === 'spotify') {
    //     return song.urlSource;
    //   }
    // };

    function setCurrent (currentSong) {
      var songKey = currentSong.key;
      masterPlayer.playState.currentSong = songKey;
    }

    function setPlayerInfo(currentSong) {
      masterPlayer.currentSongInfo.image = currentSong.image;
      masterPlayer.currentSongInfo.name = currentSong.name;
      masterPlayer.currentSongInfo.artist = currentSong.artist;
      masterPlayer.currentSongInfo.album = currentSong.album;
      masterPlayer.currentSongInfo.company = currentSong.company;
    }

    masterPlayer.nextSong = function () {
      var current = masterPlayer.playState.currentSong;
      var next = current + 1;

      if (masterPlayer.playState.playing === true && vm.tracks[next]) {
        masterPlayer.src = getSong(vm.tracks[next]);
        setPlayerInfo(vm.tracks[next]);
        setCurrent(vm.tracks[next]);
        masterPlayer.play();
      }
      else if (!(vm.tracks[next])) {
        masterPlayer.src = getSong(vm.tracks[0]);
        setPlayerInfo(vm.tracks[0]);
        setCurrent(vm.tracks[0]);
        masterPlayer.play();
      }
    }

    masterPlayer.previousSong = function () {
      var current = masterPlayer.playState.currentSong;
      var previous = current - 1;

      if (masterPlayer.playState.playing === true && vm.tracks[previous]) {
        masterPlayer.src = getSong(vm.tracks[previous]);
        setPlayerInfo(vm.tracks[previous]);
        setCurrent(vm.tracks[previous]);
        masterPlayer.play();
      }
      else if (!(vm.tracks[previous])) {
        var lastTrack = vm.tracks[((0 - vm.tracks.length)*-1) - 1];
        masterPlayer.src = getSong(lastTrack);
        setPlayerInfo(lastTrack);
        setCurrent(lastTrack);
        masterPlayer.play();
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

    masterPlayer.getInfo = () => currentSongInfo;

    masterPlayer.togglePlay = function (songUrl, songIndex) {


    //  console.log('toggle play');
      // if (vm.tracks.length > 1 && masterPlayer.src === '') {
      //   masterPlayer.src = getSong(vm.tracks[0]);
      //   setPlayerInfo(vm.tracks[0]);
      //   setCurrent(vm.tracks[0]);
      // }
      // else if (masterPlayer.src === '') {
      //   return
      // };
      // (masterPlayer.playState.playing === false) ? masterPlayer.play() : masterPlayer.pause();
      // masterPlayer.toggleState();
      // vm.digest();
    }

    masterPlayer.playMusic = function (song) {
      TrackList.setActive(song);


      setCurrent (song);
      setPlayerInfo (song);

      // console.log(masterPlayer.currentSongInfo);
      // console.log(currentSongInfo);
      //
      // console.log('playing');

      // masterPlayer.src = song;
      // (masterPlayer.playState.playing === false) ? masterPlayer.togglePlay() : masterPlayer.play();
    }

  return masterPlayer

  })
