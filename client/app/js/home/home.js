angular.module('home', ['ngRoute'])
  .controller('formController', ['$scope', function ($scope) {
    vm = this;
    vm.submitForm = function (isValid) {
      if(isValid) {
        console.log('works')
      }
    }
    $scope.username;
    $scope.password;
  }])
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
        $('#form-submit-btn').click(function () {
          console.log('clicked')
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