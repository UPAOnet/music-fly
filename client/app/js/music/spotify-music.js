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
      spotifySearch.makeRequest($scope.query).then(
        function (response) {
          vm.tracks = {};
          var listings = response.data.tracks.items;
          // console.log(vm.tracks);
          vm.tracks = listings;
        }
      )
    }

  }])
  .directive('musicDirective', function () {
    return {
      scope: true,
      replace: false,    
      template: '<button type="button" ng-click="spotifySearch()"/>'
    }
  })
  .factory('spotifySearch', ['$http', '$q', function ($http, $q) {
    var deferred = $q.defer();
    var search = {};
    // console.log(query)
    search.makeRequest = function (input) {
      var query = JSON.stringify({queryInput: input})
      // console.log(query);
      $http({
        data: query,
        url: 'http://localhost:3000/spotify',
        method: 'POST',
      }).then(function success (response) {
        deferred.resolve(response)
        // console.log(response);     
      })
      return deferred.promise;  
    } 
    return search;
  }])

SC.initialize({
  client_id: 'b10a9e77003de676a40bcd4ce7346f03'
})

SC.get('/tracks', {
  q: 'Calvin Harris', limit: 20
}).then(function(tracks) {
  console.log(tracks);
});