angular.module('musicApp')
  .factory('userLogin', ['$http', function ($http) {

    function login (userName, password) {

      var query = JSON.stringify({
        userName: userName,
        password: password
      })
      
      // console.log(query)

      $http({
        data: query,
        url: '/users/login',
        method: 'POST'
      }).then (function (response) {
        console.log(response)
      })
    }

    return {
      login: login
    }

  }])