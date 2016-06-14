// import angular from '../../node_modules/angular/angular.js';
declare const require

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const angularMaterial = require('angular-material');
const MODULE_NAME = 'musicApp'

import {RouteConfig} from './js/routes/RouteConfig.ts';

export const module = angular.module(MODULE_NAME, [
  uiRouter,
  angularMaterial
])
  .config(RouteConfig)
