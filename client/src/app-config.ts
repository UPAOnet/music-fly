// import angular from '../../node_modules/angular/angular.js';
declare const require

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const angularMaterial = require('angular-material');
const MODULE_NAME = 'musicApp'
// SC.initialize({client_id: 'b10a9e77003de676a40bcd4ce7346f03'})
import {RouteConfig} from './js/routes/RouteConfig.ts';

export const module = angular.module(MODULE_NAME, [
  uiRouter,
  angularMaterial
])
  .config(RouteConfig)
