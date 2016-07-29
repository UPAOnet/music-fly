import {PlaylistsService} from '../../music/service/Playlists.service.ts';
import {MusicEvents} from '../../music/constants/musicEvents.ts';

class Controller {
  private tabs;

  // Input field data
  private newListName: string;
  private isAddingPlaylist: boolean;
  private playlists: any;
                                                      
  constructor(
    private playlistsService: PlaylistsService,
    private $scope: ng.IScope,
    private musicEvents: MusicEvents,
    private $rootScope: ng.IRootScopeService
  ) {
    'ngInject';

    this.playlists = this.playlistsService.loadSavedLists();

    this.$scope.$on(this.musicEvents.newPlaylist, (event, playlists) => {
      this.playlists = playlists;
    })
  }

  /**
   * Handles steps to creating a list
   * {list} - the list object
   */
  private createTheList (list: any) {
     
  }

  /**
   * Switches to featured page
   */
  public switchFeatured () {
    this.$rootScope.$broadcast(this.musicEvents.featuredPage);
  }


  /**
   * Switches playlist
   * {index} - index position of array element in repeater
   */
  public switchPlaylist (index) {
    let desiredList = this.playlists[index];
    this.$scope.$emit(this.musicEvents.switchPlaylist, desiredList);
  }

  /**
   * Displays the input field for playlists
   */
  public showNewField (): void {
    this.isAddingPlaylist = true;
  }

  public addNewPlaylist (event): void  {
    if (event.keyCode === 13) {

      if (this.newListName === '') {
        return
      }
      this.playlistsService.createNewPlaylist(this.newListName);
      this.newListName = '';
      this.isAddingPlaylist = false;    
    } 
  }
}

export const MusicPanel = {
  templateUrl: require('./musicPanel.html'),
  controller: Controller
}
