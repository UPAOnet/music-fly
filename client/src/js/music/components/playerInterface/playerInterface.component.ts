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

    this.title = 'Title';
    this.artist = 'Artist';
    this.album = 'Album';

    this.playerControls = playerControls;
    this.currentTrack = null;

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
