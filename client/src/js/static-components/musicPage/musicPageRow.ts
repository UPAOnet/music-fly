// Row components for the music pages

class Controller {
  private currentPlaylistIndex: number;
  //bindings
  private header: string;

  constructor (
    private playlistsService,
    private $rootScope: ng.IRootScopeService,
    private musicEvents
  ) {
    'ngInject';

    this.$rootScope.$on(this.musicEvents.switchPlaylist, (event, data) => {
      this.currentPlaylistIndex = data.index;
    });

  }

  public deletePlaylist () {
    this.playlistsService.deletePlaylist(this.header, this.currentPlaylistIndex);
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
