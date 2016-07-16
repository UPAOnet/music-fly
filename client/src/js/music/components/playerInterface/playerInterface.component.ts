'use strict'

/**
 * Displays information regarding current track.
 * @module playerInterfaceComponent
 */

declare const require: any;

interface TrackProps {
  name: string;
  artist: string;
  album: string;
  image: string;
  company: string;
}

class playerInterfaceController {

  private shouldShow: boolean;
  private title: string;
  private artist: string;
  private album: string;
  private duration: number;
  private currentTrack: TrackProps;

  constructor (
    private TrackList,
    private playerControls,
    private $scope
  ) {
    'ngInject';

    // Handles the state of the track table
    this.shouldShow = this.playerControls.checkPlayingState();

    // Gets updated track information
    this.$scope.$watchCollection (
      () => this.playerControls.currentSongInfo,
      (newValue: any, oldValue: any) => {

        if (newValue === oldValue) {
          return
        }
        this.currentTrack = this.playerControls.currentSongInfo;
        this.updateInfo();
      }
    )
  }

  /**
   * Updates the view 
   */
  updateInfo () {
    this.title = this.currentTrack.name;
    this.artist = this.currentTrack.artist;
    this.album = this.currentTrack.album;
  }

}

export const playerInterfaceComponent = {
  templateUrl: require('./player-interface.html'),
  controller: playerInterfaceController
}


// function getSong (song) {
    //   // scClient = 'b10a9e77003de676a40bcd4ce7346f03'
    //   if (song.company === 'soundcloud') {
    //     return 'https://api.soundcloud.com/tracks/' + song.urlSource + '/stream?client_id=' + scClient;
    //   }
    //   if (song.company === 'spotify') {
    //     return song.urlSource;
    //   }
    // };
