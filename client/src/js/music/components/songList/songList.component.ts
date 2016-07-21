
class SongListController {
 private tracks: any;
 private list: any;
 private showTable: any;
 private selectedSong: any;
 private availablePlaylists: any;
 private header: string;
 private origin: string;

 // Controller for musicPage
 private pageCtrl: any;

 constructor (
   private TrackList,
   private playlistsService,
   private playerControls,
   private $timeout,
   private musicEvents,
   private $rootScope,
   private $scope
 ) {
  'ngInject';

  this.availablePlaylists = this.playlistsService.loadSavedLists();
  
  // Listens for any search events
  this.$rootScope.$on(this.musicEvents.newSearch, (event, searchResults) => {
    this.pageCtrl.showSearch();

    if (this.origin === 'soundcloud') {
      this.tracks = searchResults[0];
    } else if (this.origin === 'spotify') {
      this.tracks = searchResults[1];
    }  

    this.header = 'Search Results';
    this.showTable = (searchResults.length > 0);
  });

  // Listen for playlist switching events
  this.$rootScope.$on(this.musicEvents.switchPlaylist, (event, playlist) => {  
    this.pageCtrl.showPlaylist();

    this.tracks = playlist.tracks;
    this.header = playlist.name;
    this.showTable = (playlist.tracks.length > 0);
  });

  // Listen for playlist creation events
  this.$scope.$on(this.musicEvents.newPlaylist, (event, newPlaylist) => {
    this.availablePlaylists = newPlaylist
  });
    
 }

 /**
  * Emits newly selected songs
  * @event SONG_SELECTED
  */
 private emitSong (song: any) {
    this.$scope.$emit(this.musicEvents.songSelected, this.selectedSong);
  }

 /**
  * Passses clicked song to the main player
  * {song} - The song object
  */
 public playMusic (song: any) {
   this.playerControls.playMusic(song);
   this.selectedSong = song;
   this.emitSong(song);
 }

 /**
  * Adds a song to a playlist
  * {Song} - The song object
  * {playlist} - Name of the playlist
  */
  public addSong (event, song: any, playlist: any): void {
    // this.emitAddTo(song, playlist);
    this.playlistsService.addTrack(song, playlist);
  }

 public openMenu (event, $mdOpenMenu) {
   event.stopPropagation();
   $mdOpenMenu(event);
 }

}


export const songList = {
   templateUrl: require('./track-list.html'),
   controller: SongListController,
   require: {
     pageCtrl: '^musicPage',
   },
   bindings: {
     origin: '@'
   }
}
