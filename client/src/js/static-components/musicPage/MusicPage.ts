
class Controller {
  private spotifyTracks: any;
  private soundcloudTracks: any;
  private playlistTracks: any
  private header: string;
  private hasPlaylist: boolean;

  constructor (
    private $rootScope,
    private $scope,
    private musicEvents,
    private playlistsService
  ) {
    'ngInject';

    // Listens for any search events
    this.$rootScope.$on(this.musicEvents.newSearch, (event, searchResults) => {
      this.soundcloudTracks = searchResults[0];
      this.spotifyTracks = searchResults[1];
      this.hasPlaylist = false;
      this.header = 'Search Results';
    })  

    // Listen for playlist switching events
    this.$rootScope.$on(this.musicEvents.switchPlaylist, (event, playlist) => {
    this.playlistTracks = playlist.tracks;
    this.hasPlaylist = true;
    this.header = playlist.name;
  });

    
    // this.showTable = (searchResults.length > 0);

  }

}


export const MusicPage = {
  templateUrl: require('./musicPage.html'),
  controller: Controller,
}

