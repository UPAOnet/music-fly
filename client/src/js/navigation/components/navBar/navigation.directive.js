var templateUrl = require('./navigation.html');

angular.module('musicApp')
  .directive('navBar', function () {
    return {
      scope: true,
      restrict: 'E',
      replace: false,
      template: templateUrl,
      controller: 'navController'
      // link: function (scope, elem, attrs) {
      //
      //   $('.ui.modal').modal({
      //     allowMultiple: false
      //   })
      //
      //   $('#sign-up-btn').click(function () {
      //     $('#sign-up-modal').modal('show')
      //   })
      //
      //   $('#log-in-btn').click(function () {
      //     $('#log-in-modal').modal('show')
      //   })
      //
      //   $('#player-toggle').click(function () {
      //     $('#player-menu').toggle('slide');
      //   })
      // }
    }
  })
