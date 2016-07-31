import {MusicEvents} from '../constants/musicEvents.ts'

interface IPlayerSongInfo {
  name: string;
  artist: string;
  album: string;
  image: string;
  company: string;
  duration: number;
}

interface IPlayState {
  playing: boolean;
  timerDuration: number;
}

interface ICurrentSongList {
  songList: string;
  index: number;
}

export class PlayerControls {
  private Player: any;
  private currentSongList: ICurrentSongList;
  private selectedSong: any;
  private currentSongInfo: IPlayerSongInfo;
  private playState: IPlayState;

  constructor (
    private $window,
    private musicEvents: MusicEvents,
    private $timeout: ng.ITimeoutService,
    private $rootScope: ng.IRootScopeService,
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
      playing: false,
      timerDuration: null,
    };

    this.currentSongList = {
      songList: null,
      index: null
    }

  }

  /**
   * Soundcloud needs a special way of playing song
   * Uses song ID to hit stream directly to circumvent temporary urls 
   * {urlSource} - url to use 
   * {Company} - Origin of the song
   */
  private setUrl (urlSource: string, company: string) {
    let SCClient = 'b10a9e77003de676a40bcd4ce7346f03';

    if (company === 'soundcloud') {
      return 'https://api.soundcloud.com/tracks/' + urlSource + '/stream?client_id=' + SCClient;
    } else {
      return urlSource
    }
  } 

  private turnOffTimer () {
    this.playState.playing = false;
  }

  private setDurationTimer (currentSong: any): void {

    // Sets timer to turn off timer once song is finished
    this.$timeout(() => this.turnOffTimer(), currentSong.duration);
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

  public checkPlayingState (): any {
    return this.playState;
  }

  public getInfo(): any {
    return this.currentSongInfo;
  }

  public nextSong (): void {
    this.$rootScope.$broadcast(this.musicEvents.nextSong, this.currentSongList);
  }

  public previousSong (): void {
    this.$rootScope.$broadcast(this.musicEvents.previousSong, this.currentSongList);
  }

  public resumeMusic(): void {
    this.Player.play();
    this.playState.playing = true;
    this.$rootScope.$broadcast(this.musicEvents.songPlay);
  }

  public pauseMusic (): void {
    this.Player.pause();
    this.playState.playing = false;
    this.$rootScope.$broadcast(this.musicEvents.songPause);
  }

  /**
   * Plays the song and sets all the required state info 
   * song - The song object
   * songList - The song list the song came from
   */
  public playMusic(song: any, index: number, songList: string): void {
    this.setDurationTimer(song);
    this.setPlayerInfo(song);
    this.selectedSong = song;

    this.currentSongList.index = index;
    this.currentSongList.songList = songList;

    this.playState.playing = true;

    this.Player.src = this.setUrl(song.urlSource, song.company);
    this.Player.play();
  } 
}