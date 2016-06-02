'use strict'

/**
 * Displays information regarding current track.
 * @module playerInterfaceComponent
 */

declare const require: any;

const templateUrl = require('./player-interface.html');

interface TrackProps {
  name: string;
  artist: string;
  album: string;
  image: string;
  company: string;
}

class playerInterfaceController {

  // Services
  private $scope: any;
  private TrackList: any;
  private playerControls: any;

  private title: string;
  private artist: string;
  private album: string;
  private currentTrack: TrackProps;

  constructor (
    TrackList,
    playerControls,
    $scope
  ) {
    'ngInject';

    this.title = 'Title';
    this.artist = 'Artist';
    this.album = 'Album';

    this.playerControls = playerControls;
    this.$scope = $scope;
    this.TrackList = TrackList;
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
  template: templateUrl,
  controller: playerInterfaceController
}
