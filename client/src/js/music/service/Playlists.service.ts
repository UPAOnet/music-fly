
export class PlaylistsService {
  private currentPlaylists: any;
  private playlistTabs: any;

  constructor(
    private $rootScope,
    private musicEvents
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

  /**
   * Renders already created or saved playlists
   */
  public loadSavedLists () {
    return this.currentPlaylists;
  }

  public createNewPlaylist (name: string): any {

    let playlist = {
      name: name,
      tracks: []
    }
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
          console.log(this.currentPlaylists);
          this.$rootScope.$broadcast(this.musicEvents.newPlaylist, this.currentPlaylists);
        }
      })      
    }


}

