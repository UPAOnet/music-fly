
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
   private $scope
 ) {
  'ngInject';

  // Services
  this.playerControls = playerControls

  this.showTable = null;
  this.selectedSong = null;

  // Checks if the songList model is populated
  this.tracks = TrackList.currentTracks();
  this.$scope.$watchCollection(() => this.tracks,
    () => {
      this.showTable = (this.tracks.length > 0);
    })
 }

 /**
  * Passses clicked song to the main player
  * {song} - The song object
  */
 public playMusic (song: any) {
   this.playerControls.playMusic(song);
   this.selectedSong = song;
 }

// public addTrack () {
//    playLists.addTrack(trackKey, playList);
//  }

}

export const songList = {
   templateUrl: require('./track-list.html'),
   controller: SongListController
}
