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

  public playMusic () {
    this.playerControls.playMusic(this.song.urlSource);
    // this.TrackList.setActive(this.index);
  }

}

export default Player;
