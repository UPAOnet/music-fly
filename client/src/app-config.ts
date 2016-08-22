// import angular from '../../node_modules/angular/angular.js';
declare const require

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const angularMaterial = require('angular-material');
const angularAnimate = require('angular-animate');
const angularNotification = require('angular-ui-notification');
const MODULE_NAME = 'musicApp'

import {RouteConfig} from './js/routes/RouteConfig.ts';
import {uiNotifications} from './js/static-components/notification/notificationConfig.ts';

export const module = angular.module(MODULE_NAME, [
  uiRouter,
  angularMaterial,
  angularAnimate,
  angularNotification
])
  .config(RouteConfig)
  .config(uiNotifications)
