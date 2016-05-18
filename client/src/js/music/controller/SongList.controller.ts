'use strict';

//  /*ngInject*/ function SongListController (
//  TrackList
// ) {
//   const vm = this;
//
//   vm.tracks = TrackList.currentTracks();
//
//   vm.addTrack = function (trackKey, playlist) {
//     playlists.addTrack(trackKey, playlist);
//
//   }
//
// }
//

class SongListController {
 private tracks: any;
 // private trackKey: any;
 // private playList: any;

 constructor (
   private TrackList
 ) {
   this.tracks = TrackList.currentTracks();
 }

// public addTrack () {
//    playLists.addTrack(trackKey, playList);
//  }

}

export default SongListController;
