import {MusicEvents} from '../../constants/musicEvents.ts'
import {PlayerControls} from '../../service/PlayerControls.service.ts';
import {PlaylistsService} from '../../service/playlists.service.ts';

class SongListController {
 private songs: any;
 private selectedSong: any;
 private availablePlaylists: any;
 private header: string;

 // Controller for musicPage
 private pageCtrl: any;

 constructor (
   private playlistsService: PlaylistsService,
   private playerControls: PlayerControls,
   private $timeout: ng.ITimeoutService,
   private musicEvents: MusicEvents,
   private $rootScope: ng.IRootScopeService,
   private $scope: ng.IScope
 ) {
  'ngInject';

  this.availablePlaylists = this.playlistsService.loadSavedLists();

  // Listen for playlist creation events
  this.$scope.$on(this.musicEvents.newPlaylist, (event, newPlaylist) => {
    this.availablePlaylists = newPlaylist
  });

  // Listen for next song event
  this.$scope.$on(this.musicEvents.nextSong, (event, currentSong) => {
    if (currentSong.company === this.songs[0].company) {
      console.log('should have one match');
    }
  });
    
 }

 /**
  * Emits newly selected songs
  * @event SONG_SELECTED
  */
 private emitSong (song: any) {
    this.$scope.$emit(this.musicEvents.songSelected, this.selectedSong);
  }

 /**
  * Passses clicked song to the main player
  * {song} - The song object
  */
 public playMusic (song: any) {
   this.playerControls.playMusic(song);
   this.selectedSong = song;
   this.emitSong(song);
 }

 /**
  * Adds a song to a playlist
  * {Song} - The song object
  * {playlist} - Name of the playlist
  */
  public addSong (event, song: any, playlist: any): void {
    // this.emitAddTo(song, playlist);
    this.playlistsService.addTrack(song, playlist);
  }

 public openMenu (event, $mdOpenMenu) {
   event.stopPropagation();
   $mdOpenMenu(event);
 }

}

export const songList = {
   templateUrl: require('./track-list.html'),
   controller: SongListController,
   bindings: {
     songs: '<',
     header: '@'
   }
}
