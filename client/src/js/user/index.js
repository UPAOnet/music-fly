import {Auth} from './auth.service.js';
import signUp from './components/signUp.component.ts';
import signIn from './components/signIn.component.ts'

angular.module('musicApp')
  .component('signUp', signUp)
  .component('signIn', signIn)
  .factory('auth', Auth)