'use strict';

// const angular = require('angular');

angular.module('musicApp')
  .component('songList', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/track-list.html',
      link: function (scope, elem, attrs) {
        elem.bind('click', function (event) {
          $('.ui.dropdown').dropdown('restore defaults');
        })
      }
    }
  })
