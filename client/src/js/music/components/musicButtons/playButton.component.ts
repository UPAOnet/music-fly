import {PlayerControls} from '../../service/PlayerControls.service.ts';
import {MusicEvents} from '../../constants/musicEvents.ts'

/**
 * The buttons on the Player
 * All Button components use this controller
 */
export class ButtonsController {
  private song: any;
  private index: number;
  private playState: any;

  constructor (
    private $scope: ng.IScope,
    private $rootScope: ng.IRootScopeService,
    private playerControls: PlayerControls,
    private musicEvents: MusicEvents
  ) {
    'ngInject';

    this.playState = this.playerControls.checkPlayingState();

  }

  public resumeMusic (): void { 
    this.playerControls.resumeMusic();
  }

  public pauseMusic (): void {   
    this.playerControls.pauseMusic();
  }

  public nextSong (): void {
    this.playerControls.nextSong();
  }

  public previousSong (): void {
    this.playerControls.previousSong();
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
    index: '<',
   }
}
