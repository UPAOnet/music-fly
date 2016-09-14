import {PlaylistsService} from '../../service/playlists.service.ts';


var Controller = /*@ngInject*/ function (
  playlistsService: PlaylistsService 
) {
  'ngInject';
  
}
 
const deletePlaylistComponent = {
  controller: Controller,
  templateUrl: require('./deletePlaylist.html')
}

export default deletePlaylistComponent;