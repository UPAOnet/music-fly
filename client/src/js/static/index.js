import {logo} from './logo/logo.ts';
import {contentOverlay} from './overlays/overlay.ts';

angular.module('musicApp')
  .component('logo', logo)
  .component('contentOverlay', contentOverlay)
