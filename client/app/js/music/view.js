angular.module('musicApp')
  .directive('navigation', function () {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      templateUrl: 'templates/navigation.html',
      link: function (scope, elem, attrs) {
        $('#sign-up-btn').click(function () {
          $('.ui.modal').modal('show')
        })
      }
    }
  })
  .directive('songList', function () {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      templateUrl: 'templates/track-list.html',
      link: function (scope, elem, attrs) {
        elem.bind('click', function (event) {   
          $('.ui.dropdown').dropdown('restore defaults');            
        })
      }
    }
  })