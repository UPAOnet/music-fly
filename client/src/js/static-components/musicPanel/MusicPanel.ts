
class Controller {
  private tabs;

  // Input field data
  private newListName: string;
  private isAddingPlaylist: boolean;
  private playlists: any;
                                                      
  constructor(
    private playlistsService
  ) {
    'ngInject';
    this.playlists = [];
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
