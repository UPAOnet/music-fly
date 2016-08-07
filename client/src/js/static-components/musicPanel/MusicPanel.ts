import {PlaylistsService} from '../../music/service/Playlists.service.ts';
import {MusicEvents} from '../../music/constants/musicEvents.ts';

class Controller {
  private tabs;

  // Input field data
  private newListName: string;
  private isAddingPlaylist: boolean;
  private playlists: any;
  private addInputEvent: any;
                                                      
  constructor(
    private playlistsService: PlaylistsService,
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private musicEvents: MusicEvents,
    private $rootScope: ng.IRootScopeService,
    private $element: ng.IRootElementService,
    private $window
  ) {
    'ngInject';   
  }

  $onInit () {
    this.playlists = this.playlistsService.loadSavedLists();

    this.$scope.$on(this.musicEvents.newPlaylist, (event, playlists) => {
      this.playlists = playlists;
    })
  }


  /**
   * Exits the input field if clicking outside
   * @event - click
   * {element} - DOM selector
   */
  private clickExit (element?) {
    let theInput = element.find('.panel-input');
    if (event.target !== theInput[0]) {
      this.$timeout(() => this.isAddingPlaylist = false); 
      this.$window.removeEventListener("click", this.addInputEvent);
      event.stopPropagation();
    }
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
  public showNewField ($event): void {
    this.isAddingPlaylist = true;
    $event.stopPropagation();
    
    this.addInputEvent = this.$window.addEventListener("click", () => {
      this.clickExit(this.$element);
    });
    
  }

  public addNewPlaylist (event): void  {
    if (event.keyCode === 13) {

      if (this.newListName === '') {
        this.isAddingPlaylist = false; 
        return
      }
      this.playlistsService.createNewPlaylist(this.newListName);
      this.newListName = '';
      this.isAddingPlaylist = false;   
      this.$window.removeEventListener("click", this.addInputEvent); 
    } 
  }
}

export const MusicPanel = {
  templateUrl: require('./musicPanel.html'),
  controller: Controller
}
