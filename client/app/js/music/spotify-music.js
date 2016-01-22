angular.module('musicApp', []) 
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
  .controller('scController',  ['$scope', function ($scope) {
      vm = this;
      vm.test = 'this is sc';
  }])
  .directive('musicDirective', function () {
    return {
      scope: true,
      replace: false,    
      template: '<button type="button" ng-click="spotifySearch()"/>'
    }
  })

// musicApp.factory('spotifySearch', ['$http', '$q', function ($http, $q) {
//     var deferred = $q.defer();
//     var search = {};
//     // console.log(query)
//     search.makeRequest = function (input) {
//       var query = JSON.stringify({queryInput: input})
//       // console.log(query);
//       $http({
//         data: query,
//         url: 'http://localhost:3000/spotify',
//         method: 'POST',
//       }).then(function success (response) {
//         deferred.resolve(response)
//         console.log(response);     
//       })
//       return deferred.promise;  
//     } 
//     return search;
//   }])
  



// 'https://p.scdn.co/mp3-preview/2d89e5af25a276eaf6b9e56baef79a543263afab'

// angular.module('musicApp', [])
//   .controller('scController',  ['$scope', function ($scope) {
//       vm = this;
//       vm.test = 'this is sc';
//   }])
//   .controller('spotifyController', ['$scope', '$http', 'spotifySearch', function ($scope, $http, spotifySearch) {
//     vm = this;
//     vm.tracks = {};
//     $scope.query = '';
//     $scope.spotifySearch = function () {
//       spotifySearch.makeRequest($scope.query).then(
//         function (response) {
//           vm.tracks = {};
//           var listings = response.data.tracks.items;
//           // console.log(vm.tracks);
//           vm.tracks = listings;
//         }
//       )
//     }

//   }])
//   .directive('musicDirective', function () {
//     return {
//       scope: true,
//       replace: false,    
//       template: '<button type="button" ng-click="spotifySearch()"/>'
//     }
//   })