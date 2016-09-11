
export class PlaylistsService {
  private currentPlaylists: any;
  private playlistTabs: any;

  constructor(
    private $rootScope,
    private musicEvents,
    private apiUtils,
    private auth
  ) {
    'ngInject';

    // My Playlist is a hard coded sample playlist
    this.currentPlaylists = [];

    this.currentPlaylists.push({
      name: 'My Playlist',
      tracks: []
    });

    this.playlistTabs
  }

  $onInit() {

  }

  /**
   * Saves playlist data
   * @params playListName - name of the playlist
   */
  private saveNewPlaylist (playListName) {
    // Can only save playlists if theres a user
    if (!this.auth.getUser()) {
      console.log('NO USER');
      return;
    }
    this.apiUtils.post('/playlist', playListName);
  }

  /**
   * Renders already created or saved playlists
   */
  public loadSavedLists () {
    return this.currentPlaylists;
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

