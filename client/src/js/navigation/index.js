import {navBar} from './components/navBar/navComponent.ts';

require('./service/index.js');

angular.module('musicApp')
  .component('navBar', navBar)
