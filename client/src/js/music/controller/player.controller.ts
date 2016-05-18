'use strict';

class Player {
  private tracks: any;
  private song: any;

  constructor (
    private TrackList,
    private $scope,
    private playerControls
  ) {
    'ngInject';

    this.tracks = this.TrackList.currentTracks();
  }

  public playMusic () {
    this.playerControls.playMusic(this.song.urlSource)
  }

}

export default Player;
