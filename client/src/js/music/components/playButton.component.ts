'use strict';

declare const require: any;

const templateUrl = require('./play-button.html');

export const playButton = {
   template: templateUrl,
   controller: 'PlayerButtonsController',
   bindings: {
    song:'<',
    // changes look depending on where it is
    roleType: '@',
    //Index position of song for playing state
    index: '<'
   }
}
