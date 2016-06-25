import {songList} from './songList/songList.component.ts';
import {playButton} from './musicButtons/playButton.component.ts';
import {playerInterfaceComponent} from './playerInterface/playerInterface.component.ts';
import {MusicSearch} from './musicSearch/MusicSearch.component.ts';


angular.module('musicApp')
  .component('playButton', playButton)
  .component('playerInterface', playerInterfaceComponent)
  .component('songList', songList)
  .component('musicSearch', MusicSearch)
