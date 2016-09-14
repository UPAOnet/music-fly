// Row components for the music pages

class Controller {
  constructor (
    private playlistsService
  ) {
    'ngInject';
  }

  public deletePlaylist (name) {
    this.playlistsService.deletePlaylist()
  }
}

export const MusicPageRow = {
  controller: Controller,
  templateUrl: require('./musicPageRow.html'),
  transclude: true,
  bindings: {
    // Binding for any header text
    header: '@',
    company: '@?',
    deleteable: '<'
  }
}
