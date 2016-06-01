'use strict'

/**
 * Displays information regarding current track.
 * @module playerInterfaceComponent
 */

class playerInterfaceController {
  private $scope: any;
  private TrackList: any;
  private playerControls: any;


  private currentTrack: any;

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


const playerInterfaceComponent = {
  templateUrl: '../templates/player-interface.html',
  controller: playerInterfaceController
}

export default playerInterfaceComponent;
