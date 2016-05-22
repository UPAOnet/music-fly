'use strict';

/**
 * The buttons on the Player
 * @module playerInterfaceComponent
 */

class Player {
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

export default Player;
