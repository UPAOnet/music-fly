
class Controller {
  private hasPlaylist: boolean;

  constructor (
    private $rootScope,
    private musicEvents
  ) {
    'ngInject';

  }

  public showPlaylist () {
    console.log('showing playlist');
    this.hasPlaylist = true;
  }

  public showSearch () {
    console.log('showing search');
    this.hasPlaylist = false;
  }

}


export const MusicPage = {
  templateUrl: require('./musicPage.html'),
  controller: Controller,
  transclude: true
}

