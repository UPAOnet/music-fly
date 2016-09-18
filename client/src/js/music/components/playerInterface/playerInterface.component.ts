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
  private musicPlaying: boolean;

  constructor (
    private TrackList,
    private $timeout: ng.ITimeoutService,
    private playerControls: PlayerControls,
    private $rootScope: ng.IRootScopeService,
    private musicEvents: MusicEvents,
    private $scope: ng.IScope
  ) {
    'ngInject';

    $scope.$watchCollection(() => playerControls.checkPlayingState(), 
      (newVal, oldVal) => { 
        this.musicPlaying = newVal.playing;
      })

    this.$rootScope.$on(this.musicEvents.songSelected, (event, data: ISongInterface) => {
      this.updateInfo(data);
      this.togglePanel(true);
    })

    // Reset the panel on logout
    this.$rootScope.$on(this.musicEvents.logout, (event, data: ISongInterface) => {
      this.togglePanel();
    })

    // Reset the panel on login
    this.$rootScope.$on(this.musicEvents.login, (event, data: ISongInterface) => {
      this.togglePanel();
    })

  }

  /**
   * Updates the song Info for interface
   */
  updateInfo (song: any) {
    this.currentTrack = song
  }

  /**
   * Toglges Display Panel
   * {on} - true for on, false for off
   */
  public togglePanel (on?: boolean) {

    if (on) {
      this.shouldShow = true;
      this.$timeout(() => {
        this.isLoaded = true;
      })
    } else {
      this.shouldShow = false;
      this.$timeout(() => {
        this.isLoaded = false;
      })
    }
  }

}

export const playerInterfaceComponent = {
  templateUrl: require('./player-interface.html'),
  controller: playerInterfaceController
}
