'use strict';

declare const require: any;

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

export const songList = {
   templateUrl: require('./track-list.html'),
   controller: SongListController
}
