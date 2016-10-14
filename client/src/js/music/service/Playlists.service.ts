import {MusicEvents} from '../constants/musicEvents.ts'

export class PlaylistsService {
  private currentPlaylists: any;

  constructor(
    private $rootScope: ng.IRootScopeService,
    private $timeout: ng.ITimeoutService,
    private musicEvents: MusicEvents,
    private apiUtils,
    private auth
  ) {
    'ngInject';   
    
    this.currentPlaylists = [];

    // Sets the default playlist
    if (!auth.getUser()) {
      this.loadDefault();
    }
    

    this.$rootScope.$on(this.musicEvents.login, (event, user) => {
      $timeout(this.currentPlaylists.length = 0);
      this.loadSavedLists();
    });

    this.$rootScope.$on(this.musicEvents.logout, (event, data) => {
      this.loadDefault();
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
  private loadDefault (): void {
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
    return this.apiUtils.put(`playlist/${playlistName}/song`, song);  
  }
 
  /**
   * Retrieves saved plylists from the server
   */
  public loadSavedLists () {

    this.apiUtils.get(`playlist`).then((result) => {
      let playlist = result.data
      
      playlist.forEach((current, i) => {
        this.currentPlaylists.push(current);
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
    // If user logged in, delete form DB and update panel
    if (this.auth.getUser()) {
      this.apiUtils.deleteCall(`playlist/${name}`).then((response) => {
        if (response.status === 200) {
          // On successful deletion, remove the deleted playlist
          this.currentPlaylists.splice(playlistIndex, 1);
          this.$rootScope.$broadcast(this.musicEvents.deletePlaylist);
        }
      });
    } else {
       // Else just update panel
       this.currentPlaylists.splice(playlistIndex, 1);
       this.$rootScope.$broadcast(this.musicEvents.deletePlaylist);
    }
    
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

    // Check if there's a user to save playlist
    if (this.auth.getUser()) {
      this.saveNewPlaylist(playlist.name, playlist.tracks);
    }
    // Regardless of user, push a newly created playlist into the panel list
    this.currentPlaylists.push(playlist);
    this.$rootScope.$broadcast(this.musicEvents.newPlaylist, this.currentPlaylists);
  }

  /**
   * Adds a song to the desired playlist
   */
  public addTrack (song: any, playlist: any) {

    this.currentPlaylists.forEach((aList, i) => {
      if (aList.name === playlist.name) {
        // if user, update panel after saving
        if (this.auth.getUser()) {
            this.saveSong(song, playlist.name).then((result) => {
            this.currentPlaylists[i].tracks.push(song);
            this.$rootScope.$broadcast(this.musicEvents.newPlaylist, this.currentPlaylists);
          })
        } else {
          // else there's no user, so just update panel
          this.currentPlaylists[i].tracks.push(song);
          this.$rootScope.$broadcast(this.musicEvents.newPlaylist, this.currentPlaylists);
        }                          
      }
    })      
  }

}

