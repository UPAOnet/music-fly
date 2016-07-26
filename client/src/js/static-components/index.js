import {logo} from './logo/logo.ts';
import {contentOverlay} from './overlays/overlay.ts';
import {MusicPanel} from './musicPanel/MusicPanel.ts';
import {MusicPageRow} from './musicPage/MusicPageRow.ts';
import {MusicPage} from './musicPage/MusicPage.ts';
import {featuredPage} from './musicPage/featuredPage.ts';
import {featuredSection} from './musicPage/featuredSection.ts'

angular.module('musicApp')
  .component('logo', logo)
  .component('contentOverlay', contentOverlay)
  .component('musicPanel', MusicPanel)
  .component('musicPageRow', MusicPageRow)
  .component('musicPage', MusicPage)
  .component('featuredPage', featuredPage)
  .component('featuredSection', featuredSection)
