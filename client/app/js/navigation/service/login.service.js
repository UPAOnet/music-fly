angular.module('musicApp')
  .factory('userLogin', ['$http', function ($http) {

    var users = {}
    
    users.info = {
      user: null,
      showWelcome: false,
      showLoginBtn: true
    }

    users.login = function (userName, password) {

      var query = JSON.stringify({
        userName: userName,
        password: password
      })

       return $http({
        data: query,
        url: '/users/login',
        method: 'POST'
      }).then (function (res) {
        if (res.status === 200) {
          var resData = JSON.parse(res.config.data);
          var user = resData.userName;
          
          vm.currentUser = user;
          console.log(vm);

          users.info.showLoginBtn = false;
          users.info.user = user;
        }
      })
    }

    return users

  }])