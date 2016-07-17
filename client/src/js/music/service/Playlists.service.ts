
export class PlaylistsService {

  constructor(

  ) {
    'ngInject';

  }
  createNewPlaylist (name: string): any {

    let playlist = {
      name: name,
      tracks: []
    }
    return playlist;
  }

}

