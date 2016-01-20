var app = angular.module('app', []);

app.controller('imager', ['$scope', function ($scope) {
  $scope.photo = {
    url: 'http://www.destination360.com/north-america/us/california/san-francisco/images/s/golden-gate-bridge-history.jpg',
    date: 'January 1, 2014'
  }
}])

app.directive('photo', function () {
  restrict: 'E',
  replace: true,
  template: '<img '
  link: function () {

  }
})








































// app.directive('photo', function () {
//   return {
//     restrict: 'E',
//     template: '<figure>' +
//               '<img ng-src="{{photoSource}}"/>'
//               '<figcaption>{{caption}}</figcaption>' +
//               '</figure>',
//     replace: true,
//     scope: {
//       caption: '@',
//       photoSource: '@'
//     }
//   }
// })