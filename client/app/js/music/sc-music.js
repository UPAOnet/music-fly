var musicApp = angular.module('musicApp', []);

musicApp.factory('spotifySearch', ['$http', '$q', function ($http, $q) {
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
        console.log(response);     
      })
      return deferred.promise;  
    } 
    return search;
  }])