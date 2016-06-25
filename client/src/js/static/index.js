import {logo} from './logo/logo.ts';
import {contentOverlay} from './overlays/overlay.ts';
import {MusicPanel} from './musicPanel/MusicPanel.ts';

angular.module('musicApp')
  .component('logo', logo)
  .component('contentOverlay', contentOverlay)
  .component('musicPanel', MusicPanel)
