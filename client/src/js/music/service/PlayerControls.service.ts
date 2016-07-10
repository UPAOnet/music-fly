
interface IPlayerSongInfo {
  name: string,
  artist: string,
  album: string,
  image: string,
  company: string
}

interface IPlayState {
  playing: boolean,
  currentSong: any
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

    // Services 
    this.$window = $window;
    this.$timeout = $timeout;
    this.TrackList = TrackList;

    // Audio Object
    this.Player = new $window.Audio();

    // Player States
    this.currentSongInfo = {
      name: null,
      artist: null,
      album: null,
      image: null,
      company: null
    }
    this.playState = {
      playing: null,
      currentSong: null
    };
    
  }

  private setCurrent (currentSong: any): void {
    let songKey = currentSong.key;
    this.playState.currentSong = songKey;
  }

  private setPlayerInfo(currentSong: any): void {
    this.currentSongInfo.image = currentSong.image;
    this.currentSongInfo.name = currentSong.name;
    this.currentSongInfo.artist = currentSong.artist;
    this.currentSongInfo.album = currentSong.album;
    this.currentSongInfo.company = currentSong.company;
  }

  private setSongTimer(): void {

  }

  public getInfo(): any {
    () => this.currentSongInfo;
  }

  public playMusic(song: any): void {
    this.TrackList.setActive(song);
    this.setCurrent(song);
    this.setPlayerInfo(song);
    this.playState.playing = true;

    this.Player.src = song.urlSource;
    this.Player.play();
  } 

  
}