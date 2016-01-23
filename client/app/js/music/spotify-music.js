angular.module('musicApp', [])
  .controller('scController',  ['$scope', function ($scope) {
      vm = this;
      vm.test = 'this is sc';
  }])
  .controller('spotifyController', ['$scope', '$http', 'spotifySearch', function ($scope, $http, spotifySearch) {
    vm = this;
    vm.tracks = {};
    $scope.query = '';
    $scope.spotifySearch = function () {
      spotifySearch.makeRequest($scope.query)
    };

  }])
  .directive('musicDirective', function () {
    return {
      scope: true,
      replace: false,    
      template: '<button type="button" ng-click="spotifySearch()"/>'
    }
  })
  .factory('spotifySearch', ['$http', function ($http) {
    var search = {};
    search.makeRequest = function (input) {
      var query = JSON.stringify({queryInput: input})
      $http({
        data: query,
        url: 'http://localhost:3000/spotify',
        method: 'POST',
      }).then(function success (response) {
        vm.tracks = response.data.tracks.items;
        console.log(response);     
      }) 
    } 
    return search;
  }])

// SC.initialize({
//   client_id: 'b10a9e77003de676a40bcd4ce7346f03'
// })

// SC.get('/tracks', {
//   q: 'Calvin Harris', limit: 20
// }).then(function(tracks) {
//   console.log(tracks);
// });

// SC.stream('/tracks/190452632').then(function(player){
//   player.play();
//   player.pause();
// });









