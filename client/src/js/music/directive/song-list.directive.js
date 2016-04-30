angular.module('musicApp')
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