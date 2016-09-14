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
      this.loadSavedLists(user.id);
    });

    this.$rootScope.$on(this.musicEvents.logout, (event, data) => {
      this.resetPlaylist();
    })

  }

  /**
   * Saves playlist data
   * @params playListName - name of the playlist
   */
  private saveNewPlaylist (playListName): void {
    // Can only save playlists if theres a user
    if (!this.auth.getUser()) {
      return;
    }
    this.apiUtils.post(`playlist/${playListName}`);
  }

  /**
   * Resets playlist upon logout
   */
  private resetPlaylist (): void {
    this.currentPlaylists = [];
    this.currentPlaylists.push({
      name: 'Demo Playlist',
      tracks: []
    });
  }
 
  /**
   * Retrieves saved plylists from the server
   */
  public loadSavedLists (userId) {
    this.apiUtils.get(`playlist`).then((result) => {
      result.data.forEach((current, i) => {
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
  public deletePlaylist(name) {
    console.log('deleting playlist', name);
    this.apiUtils.deleteCall(`playlist/${name}`);
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

    this.saveNewPlaylist(playlist.name);
    this.currentPlaylists.push(playlist);
    this.$rootScope.$broadcast(this.musicEvents.newPlaylist, this.currentPlaylists);
  }

  /**
   * Adds a song to the desired playlist
   */
  public addTrack (song: any, playlist: any) {

      this.currentPlaylists.forEach((aList, i) => {
        if (aList.name === playlist.name) {
          this.currentPlaylists[i].tracks.push(song);
          this.$rootScope.$broadcast(this.musicEvents.newPlaylist, this.currentPlaylists);
        }
      })      
    }


}

