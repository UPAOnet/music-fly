angular.module('musicApp', [])
  .controller('spotifyController', ['$scope', '$http', 'spotifySearch', function ($scope, $http, spotifySearch) {
    vm = this;
    vm.tracks = {};
    $scope.query = '';
    $scope.spotifySearch = function () {
      // console.log(response)
      spotifySearch.makeRequest($scope.query).then(
        function (response) {
          var listings = response.data.tracks.items;
          // console.log(response)
          vm.tracks = listings;
          // console.log(vm.tracks);
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
      $http({
        data: query,
        url: 'http://localhost:3000/spotify',
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded'
        // }
      }).then(function success (response) {
        deferred.resolve(response)
              
      })
      return deferred.promise;  
    } 
    return search;
  }])



//2) integrate a text input


  // console.log(deferred.promise);
        // console.log(response)