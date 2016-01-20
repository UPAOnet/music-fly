angular.module('musicApp', [])
  .controller('spotifyController', ['$scope', '$http', 'spotifySearch', function ($scope, $http, spotifySearch) {
    vm = this;
    vm.tracks = {};
    // vm.listings = vm.tracks.trackInfo.data.body.tracks.items
    $scope.spotifySearch = function () {
      // console.log(response)
      spotifySearch.makeRequest().then(
        function (response) {
          var listings = response.data.body.tracks.items
          // vm.tracks.trackInfo = response;
          // console.log(response)
          vm.tracks = listings;
          console.log(vm.tracks);
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

    search.makeRequest = function () {
      $http({
        url: 'http://localhost:3000/spotify',
        method: 'GET'
      }).then(function success (response) {
        deferred.resolve(response)
        // console.log(deferred.promise);        
      })
      return deferred.promise;  
    } 
    return search;
  }]);



//1) clean up the results
//2) integrate a text input

