
class SongListController {
 private tracks: any;
 private showTable: any;
 private selectedSong: any;
 // private trackKey: any;
 // private playList: any;

 constructor (
   private TrackList,
   private playerControls,
   private $timeout,
   private musicEvents,
   private $scope
 ) {
  'ngInject';

  // Checks if the songList model is populated
  this.tracks = TrackList.currentTracks();
  
  
  // Watcher to check if track list is populated, which
  // will display the song table
  this.$scope.$watchCollection(() => this.tracks,
    () => {
      this.showTable = (this.tracks.length > 0);
    })
  
  // Broadcasts an event when new song is selected
  this.$scope.$watch(() => this.selectedSong, 
    (oldValue, newValue) => {
      
      if (oldValue === newValue) {
        return
      }
      this.broadCastSong(newValue);

    })
 }

 /**
  * Broadcasts newly selected songs
  * @event SONG_SELECTED
  */
 private broadCastSong (song: any) {
    this.$scope.$emit(this.musicEvents.songSelected, this.selectedSong);
  }

 /**
  * Passses clicked song to the main player
  * {song} - The song object
  */
 public playMusic (song: any) {
   this.playerControls.playMusic(song);
   this.selectedSong = song;
 }

}


export const songList = {
   templateUrl: require('./track-list.html'),
   controller: SongListController
}
