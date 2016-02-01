angular.module('home', ['ngRoute'])

// .config(['$routeProvider', function ($routeProvider) {
//   $routeProvider. 
//     when('/music', {
//       template: 'music.html'
//     }).
//     otherwise({redirectTo: '/'})
// }])

.controller('hero', ['$scope', function ($scope) {
  
}])

.directive('music-player', function () {
  return {
    scope: false,
    restrict: 'E',
    replace: true,
    template:'music.html'
})