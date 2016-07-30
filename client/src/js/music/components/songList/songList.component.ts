import {MusicEvents} from '../../constants/musicEvents.ts'
import {PlayerControls} from '../../service/PlayerControls.service.ts';
import {PlaylistsService} from '../../service/playlists.service.ts';

class SongListController {
 private songs: any;

 private selectedSong: any;
 private songList: string;

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
  this.$scope.$on(this.musicEvents.newPlaylist, (event, newPlaylist: any) => {
    this.availablePlaylists = newPlaylist
  });

  this.$scope.$on(this.musicEvents.nextSong, (event, originalList: any) => {
    if (originalList.songList === this.songList) {
      this.playNextSong(originalList.index);
    }
  });

  this.$scope.$on(this.musicEvents.previousSong, (event, originalList: any) => {
    if (originalList.songList === this.songList) {
      this.playPreviousSong(originalList.index);
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
  * Plays the next song 
  */
 private playNextSong (index:number): void {
   let next;
   let newIndex;

   if (this.songs[index+1]) {
     newIndex = index+1;
     next = this.songs[newIndex];  
   } else {
     newIndex = 0;
     next = this.songs[newIndex];   
   }
   this.playMusic(next, newIndex, this.songList)
 }

 /**
  * Play Previous Song
  */
  private playPreviousSong (index:number): void {
  let previous;
  let newIndex;

  if (this.songs[index-1]) {
    newIndex = index-1;
    previous = this.songs[newIndex];  
  } else {
    newIndex = this.songs.length - 1;
    previous = this.songs[newIndex];   
  }
  this.playMusic(previous, newIndex, this.songList)
 }

 /**
  * Passses clicked song to the main player
  * {song} - The song object
  */
 public playMusic (song: any, index: number, songList: string) {
   this.playerControls.playMusic(song, index, this.songList);
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
     header: '@',
     songList: '@',
     company: '@?'
   }
}
