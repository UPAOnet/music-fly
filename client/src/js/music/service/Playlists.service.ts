import {MusicEvents} from '../constants/musicEvents.ts'

export class PlaylistsService {
  private currentPlaylists: any;

  constructor(
    private $rootScope: ng.IRootScopeService,
    private musicEvents: MusicEvents,
    private apiUtils,
    private auth
  ) {
    'ngInject';   
    
    this.currentPlaylists = [];

    // Sets the default playlist
    this.resetPlaylist();

    this.$rootScope.$on(this.musicEvents.login, (event, user) => {
      this.loadSavedLists();
    });

    this.$rootScope.$on(this.musicEvents.logout, (event, data) => {
      this.resetPlaylist();
    })

  }

  /**
   * Saves playlist data
   * @params playListName - name of the playlist
   * @params songs - list of songs
   */
  private saveNewPlaylist (playListName, songs): void {
    // Can only save playlists if theres a user
    if (!this.auth.getUser()) {
      return;
    }
    this.apiUtils.post(`playlist/${playListName}`, songs);
  }

  /**
   * Resets playlist upon logout
   */
  private resetPlaylist (): void {
    this.currentPlaylists.length = 0;
    this.currentPlaylists.push({
      name: 'Demo Playlist',
      tracks: []
    });
  }

  /**
   * Saves a song to the database
   */
  private saveSong (song, playlistName) {
    return this.apiUtils.post(`playlist/${playlistName}/song`, song);
  }
 
  /**
   * Retrieves saved plylists from the server
   */
  public loadSavedLists () {
    this.apiUtils.get(`playlist`).then((result) => {
      let playlist = result.data
      
      playlist.forEach((current, i) => {
        current.tracks = [];
        this.currentPlaylists.push(current);
        console.log(playlist);
      })
    });
  } 

  /**
   * Gets currently cached playlists
   */
  public getPlaylists() {
    return this.currentPlaylists;
  }

  /**
   * Deletes a playlist
   */
  public deletePlaylist(name, playlistIndex) {
    this.apiUtils.deleteCall(`playlist/${name}`).then((response) => {
      if (response.status === 200) {
        // On successful deletion, remove the deleted playlist
        this.currentPlaylists.splice(playlistIndex, 1);
        this.$rootScope.$broadcast(this.musicEvents.deletePlaylist);
      }
    });
  }

  /**
   * Adds new playlists to current paylist cache
   * This will create a single source for playlists
   * Only users will actually be able save them
   */
  public createNewPlaylist (name: string): any {

    let playlist = {
      name: name,
      tracks: []
    };

    this.saveNewPlaylist(playlist.name, playlist.tracks);
    this.currentPlaylists.push(playlist);
    this.$rootScope.$broadcast(this.musicEvents.newPlaylist, this.currentPlaylists);
  }

  /**
   * Adds a song to the desired playlist
   */
  public addTrack (song: any, playlist: any) {

      this.currentPlaylists.forEach((aList, i) => {

        if (aList.name === playlist.name) {        
          this.saveSong(song, playlist.name).then((result) => {
            console.log(this.currentPlaylists);
            this.currentPlaylists[i].tracks.push(song);
            this.$rootScope.$broadcast(this.musicEvents.newPlaylist, this.currentPlaylists);
          })        
        }
      })      
    }

}

