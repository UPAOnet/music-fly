
class SongListController {
 private tracks: any;
 private list: any;
 private showTable: any;
 private selectedSong: any;
 private header: string;
 // private trackKey: any;
 // private playList: any;

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
  this.$rootScope.$on(this.musicEvents.newSearch, (event, data) => {
    this.tracks = data;
    this.showTable = (this.tracks.length > 0);
    this.header = 'Search Results';
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

}


export const songList = {
   templateUrl: require('./track-list.html'),
   controller: SongListController
}
