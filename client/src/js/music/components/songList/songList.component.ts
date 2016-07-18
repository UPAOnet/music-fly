
class SongListController {
 private tracks: any;
 private list: any;
 private showTable: any;
 private selectedSong: any;
 private header: string;

 constructor (
   private TrackList,
   private playerControls,
   private $timeout,
   private musicEvents,
   private $rootScope,
   private $scope
 ) {
  'ngInject';

  
  // Listens for any search events
  this.$rootScope.$on(this.musicEvents.newSearch, (event, searchResults) => {
    this.showTable = (searchResults.length > 0);
    this.tracks = searchResults;   
    this.header = 'Search Results';
  });

  // Listen for playlist events
  this.$rootScope.$on(this.musicEvents.switchPlaylist, (event, playlist) => {
    console.log('playlist received ' + playlist);
    this.showTable = (playlist.length > 0);
    this.tracks = playlist.tracks;
    this.header = playlist.name;
  });
    
 }

 
 /**
  * Broadcasts newly selected songs
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
  */
 public addSong (event, song, $mdOpenMenu) {
   event.stopPropagation();
   console.log('should be opening');
   $mdOpenMenu(event);
  //  console.log(event.target);
 }

}


export const songList = {
   templateUrl: require('./track-list.html'),
   controller: SongListController
}
