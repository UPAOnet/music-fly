'use strict'

/**
 * The Track Info display on the Player.
 * @module playerInterfaceComponent
 */

class playerInterfaceController {
  private $scope: any;
  private TrackList: any;
  private currentTrack: any;
  private title: string;
  private artist: string;
  private album: string;
  private company: string;

  constructor (
    TrackList,
    playerControls,
    $scope
  ) {
    this.TrackList = TrackList

    let currentTrack = null;
    this.getInfo();
  }

//     getInfo () {
//
// }

const playerInterfaceComponent = {
  templateUrl: '../templates/player-interface.html',
  controller: playerInterfaceController
}

export default playerInterfaceComponent;
