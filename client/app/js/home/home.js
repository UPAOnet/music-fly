var homeApp = angular.module('home', ['nav']);

homeApp.controller('hero', ['$scope', function ($scope) {
  // $scope.video = "/assets/video/sun.mp4";
  $scope.poster = "/assets/images/home/poster.jpg";
}])

homeApp.directive('heroVideo', function () {
  return {
    restrict: 'E', 
    replace: false,
    template: '<video loop muted poster={{poster}} autoplay=true>' +
                '<source type=video/mp4 src= {{video}}>' +
              '</video>'
  }
})