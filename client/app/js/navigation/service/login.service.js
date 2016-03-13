angular.module('musicApp')
  .factory('userLogin', ['$http', function ($http) {

    
    function login (userName, password) {

      var query = JSON.stringify({
        userName: userName,
        password: password
      })

       return $http({
        data: query,
        url: '/users/login',
        method: 'POST'
      })

    }

    return {
      login: login
    }

  }])