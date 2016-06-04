'use strict';

/**
 * The buttons on the Player
 * All Button components use this controller
 * @module playerInterfaceComponent
 */

export class ButtonsController {
  private tracks: any;
  private song: any;
  private index: number;

  constructor (
    private TrackList,
    private $scope,
    private playerControls
  ) {
    'ngInject';

    this.tracks = this.TrackList.currentTracks();
  }

  // Passses clicked song to the main player
  public playMusic () {
    this.playerControls.playMusic(this.song);
    // this.TrackList.setActive(this.index);
  }
}
