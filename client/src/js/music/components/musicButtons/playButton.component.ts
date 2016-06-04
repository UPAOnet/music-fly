'use strict';

import {ButtonsController} from './PlayerButtons.controller.ts';

declare const require: any;

export const playButton = {
   template: require('./play-button.html'),
   controller: ButtonsController,
   bindings: {
    song:'<',
    // changes look depending on where it is
    roleType: '@',
    //Index position of song for playing state
    index: '<'
   }
}
