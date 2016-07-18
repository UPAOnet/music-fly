
class Controller {
  private tabs;

  // Input field data
  private newListName: string;
  private isAddingPlaylist: boolean;
  private playlists: any;
                                                      
  constructor(
    private playlistsService,
    private $scope,
    private musicEvents
  ) {
    'ngInject';

    // My Playlist is a hard coded sample playlist
    this.playlists = [{
      name: 'My Playlist',
      tracks: []
    }];
  }

  /**
   * Handles steps to creating a list
   * {list} - the list object
   */
  private createTheList (list: any) {
     this.newListName = '';
     this.playlists.push(list);
     this.isAddingPlaylist = false;
  }

  /**
   * Switches playlist
   * {index} - index position of array element in repeater
   */
  public switchPlaylist (index) {
    console.log('switching playlist ' + index);
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
      let newList = this.playlistsService.createNewPlaylist(this.newListName);
      this.createTheList(newList);     
    } 
  }
}

export const MusicPanel = {
  templateUrl: require('./musicPanel.html'),
  controller: Controller
}
