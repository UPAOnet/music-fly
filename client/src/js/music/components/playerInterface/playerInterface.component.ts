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
  private $scope: any;
  private TrackList: any;
  private playerControls: any;
  private currentTrack: TrackProps;

  constructor (
    TrackList,
    playerControls,
    $scope
  ) {
    'ngInject';

    const self = this;

    this.playerControls = playerControls;
    this.$scope = $scope;
    this.TrackList = TrackList;
    this.currentTrack = null;

    // Gets updated track information
    this.$scope.$watchCollection (
      () => this.playerControls.currentSongInfo,
      function (newData: any, oldData: any) {
        self.currentTrack = self.playerControls.currentSongInfo;
      })

  }

}

export const playerInterfaceComponent = {
  template: templateUrl,
  controller: playerInterfaceController
}
