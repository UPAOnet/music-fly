import {ISongInterface} from '../../../interfaces/songInterface.ts';
import {MusicEvents} from '../../constants/musicEvents.ts'
import {PlayerControls} from '../../service/PlayerControls.service.ts';

/**
 * Displays information regarding current track.
 * @module playerInterfaceComponent
 */
export class playerInterfaceController {

  private shouldShow: boolean;
  private currentTrack: ISongInterface;
  private isLoaded: boolean;

  constructor (
    private TrackList,
    private $timeout: ng.ITimeoutService,
    private playerControls: PlayerControls,
    private $rootScope: ng.IRootScopeService,
    private musicEvents: MusicEvents,
    private $scope: ng.IScope
  ) {
    'ngInject';

    this.$rootScope.$on(this.musicEvents.songSelected, (event, data: ISongInterface) => {
      this.updateInfo(data);
      this.shouldShow = true;

      this.$timeout(() => {
        this.isLoaded = true;
      })
    })

  }

  /**
   * Updates the song Info for interface
   */
  updateInfo (song: any) {
    this.currentTrack = song
  }

  public togglePanel () {
    this.shouldShow = false;
    this.isLoaded = false;
  }

}

export const playerInterfaceComponent = {
  templateUrl: require('./player-interface.html'),
  controller: playerInterfaceController
}
