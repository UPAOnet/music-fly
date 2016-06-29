import {logo} from './logo/logo.ts';
import {contentOverlay} from './overlays/overlay.ts';
import {MusicPanel} from './musicPanel/MusicPanel.ts';
import {MusicPageRow} from './musicPage/MusicPageRow.ts';
import {MusicPage} from './musicPage/MusicPage.ts';


angular.module('musicApp')
  .component('logo', logo)
  .component('contentOverlay', contentOverlay)
  .component('musicPanel', MusicPanel)
  .directive('musicPageRow', MusicPageRow)
  .component('musicPage', MusicPage)
