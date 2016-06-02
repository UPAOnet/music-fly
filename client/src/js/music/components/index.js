
import {songList} from './songList.component.js';
import {playButton} from './playButton.component.ts';
import {playerInterfaceComponent} from './playerInterface/playerInterface.component.ts'

angular.module('musicApp')
  .component('playButton', playButton)
  .component('playerInterface', playerInterfaceComponent)
  .component('songList', songList)
