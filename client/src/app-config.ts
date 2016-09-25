declare const require

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const angularMaterial = require('angular-material');
const angularAnimate = require('angular-animate');
const angularUiBootstrap = require('angular-ui-bootstrap');
const MODULE_NAME = 'musicApp'

import {RouteConfig} from './js/routes/RouteConfig.ts';

export const app = angular.module(MODULE_NAME, [
  uiRouter,
  angularMaterial,
  angularAnimate,
  angularUiBootstrap
])
  .config(RouteConfig)
