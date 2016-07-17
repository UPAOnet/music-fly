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

  }

  // Passses clicked song to the main player
  public playMusic () {
    this.playerControls.playMusic(this.song);
    // this.TrackList.setActive(this.index);
  }
}

export const playButton = {
   templateUrl: require('./play-button.html'),
   controller: ButtonsController,
   bindings: {
    song:'<',
    // changes look depending on where it is
    roleType: '@',
    //Index position of song for playing state
    index: '<'
   }
}
