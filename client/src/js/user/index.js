import {Auth} from './auth.service.js';
import signUp from './components/signUp.component.ts';

angular.module('musicApp')
  .component('signUp', signUp)
  .factory('auth', Auth)