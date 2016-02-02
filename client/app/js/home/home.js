angular.module('home', ['ngRoute'])
  .controller('formController', ['$scope', function ($scope) {
    
  }])
  .directive('navigation', function () {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      templateUrl: 'templates/navigation.html',
      link: function (scope, elem, attrs) {
        $('#sign-up-btn').click(function () {
          console.log('clicked')
          $('.ui.modal').modal('show')
        })
      }
    }
  })







// .config(['$routeProvider', function ($routeProvider) {
//   $routeProvider. 
//     when('/music', {
//       template: 'music.html'
//     }).
//     otherwise({redirectTo: '/'})
// }])

// .directive('music-player', function () {
//   return {
//     scope: false,
//     restrict: 'E',
//     replace: true,
//     template:'music.html'
// })