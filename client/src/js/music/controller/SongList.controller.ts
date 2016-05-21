'use strict';

class SongListController {
 private tracks: any;
 // private trackKey: any;
 // private playList: any;

 constructor (
   private TrackList
 ) {
   'ngInject';

   this.tracks = TrackList.currentTracks();
 }

// public addTrack () {
//    playLists.addTrack(trackKey, playList);
//  }

}

export default SongListController;
