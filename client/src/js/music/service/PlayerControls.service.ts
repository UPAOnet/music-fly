
interface IPlayerSongInfo {
  name: string,
  artist: string,
  album: string,
  image: string,
  company: string,
  duration: number
}

interface IPlayState {
  playing: boolean,
  currentSong: any,
  timerDuration: number
}

export class PlayerControls {
  private Player: any;
  private currentSongInfo: IPlayerSongInfo;
  private playState: IPlayState

  constructor (
    private $window,
    private $timeout,
    private TrackList
  ) {
    'ngInject';

    // Audio Object
    this.Player = new $window.Audio();

    // Player States
    this.currentSongInfo = {
      name: null,
      artist: null,
      album: null,
      image: null,
      company: null,
      duration: null
    }
    this.playState = {
      playing: null,
      timerDuration: null,
      currentSong: null
    };

  }

  /**
   * Soundcloud needs a special way of playing song
   * Uses song ID to hit stream directly to circumvent temporary urls 
   * {urlSource} - url to use 
   * {Company} - Origin of the song
   */
  private setUrl (urlSource, company) {
    let SCClient = 'b10a9e77003de676a40bcd4ce7346f03';

    if (company === 'soundcloud') {
      return 'https://api.soundcloud.com/tracks/' + urlSource + '/stream?client_id=' + SCClient;
    } else {
      return urlSource
    }
  }

  private checkPlayingState () {
    return this.playState.playing;
  }

  private setCurrentState (currentSong: any): void {
    this.setSongTimer(this.playState.timerDuration);
    let songKey = currentSong.key;
    this.playState.currentSong = songKey;
    this.playState.timerDuration = currentSong.duration;
  }

  private setPlayerInfo(currentSong: any): void {
    this.currentSongInfo.image = currentSong.image;
    this.currentSongInfo.name = currentSong.name;
    this.currentSongInfo.artist = currentSong.artist;
    this.currentSongInfo.album = currentSong.album;
    this.currentSongInfo.company = currentSong.company;
    this.currentSongInfo.duration = currentSong.duration;
  }

  private turnOffTimer () {
    this.playState.playing = false;
  }

  private setSongTimer(duration): void {

    // Resets timer everytime a new song is played
    this.playState.timerDuration = null;

    // Sets timer to turn off timer once song is finished
    this.$timeout(() => this.turnOffTimer(), duration);
  }

  public getInfo(): any {
    () => this.currentSongInfo;
  }

  public playMusic(song: any): void {
    this.TrackList.setActive(song);
    this.setCurrentState(song);
    this.setPlayerInfo(song);
    this.playState.playing = true;

    this.Player.src = this.setUrl(song.urlSource, song.company);
    this.Player.play();
  } 

  
}