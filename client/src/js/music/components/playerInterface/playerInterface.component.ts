import {ISongInterface} from '../../../interfaces/songInterface.ts';


/**
 * Displays information regarding current track.
 * @module playerInterfaceComponent
 */
export class playerInterfaceController {

  private shouldShow: boolean;
  private currentTrack: ISongInterface

  constructor (
    private TrackList,
    private playerControls,
    private $rootScope,
    private musicEvents,
    private $scope
  ) {
    'ngInject';

    this.$rootScope.$on(this.musicEvents.songSelected, (event, data: ISongInterface) => {
      this.updateInfo(data);
      this.shouldShow = true;   
    })

  }

  /**
   * Updates the song Info for interface
   */
  updateInfo (song: any) {
    this.currentTrack = song
  }

}

export const playerInterfaceComponent = {
  templateUrl: require('./player-interface.html'),
  controller: playerInterfaceController
}
