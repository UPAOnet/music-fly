import {MusicEvents} from '../../music/constants/musicEvents.ts'
import {PlaylistsService} from '../../music/service/Playlists.service.ts'

class Controller {
  private spotifyTracks: any;
  private soundcloudTracks: any;
  private playlistTracks: any;
  private header: string;

  private hasPlaylist: boolean;
  private showSongs: boolean;

  constructor (
    private $rootScope: ng.IRootScopeService,
    private $scope: ng.IScope,
    private musicEvents: MusicEvents,
    private playlistsService: PlaylistsService
  ) {
    'ngInject';

    // Listens for any search events
    this.$rootScope.$on(this.musicEvents.newSearch, (event, searchResults) => {

      this.soundcloudTracks = searchResults[0];
      this.spotifyTracks = searchResults[1];
      this.hasPlaylist = false;
      this.showSongs = true;
      this.header = 'Search Results';
    })  

    // Listen for playlist switching events
    this.$rootScope.$on(this.musicEvents.switchPlaylist, (event, playlist) => {
      this.playlistTracks = playlist.tracks;
      this.hasPlaylist = true;
      this.showSongs = true;
      this.header = playlist.name;
    });

    // Listens for featured page switch
    this.$rootScope.$on(this.musicEvents.featuredPage, (event) => {
      this.showSongs = false; 
    });

  }
  
}


export const MusicPage = {
  templateUrl: require('./musicPage.html'),
  controller: Controller,
}

