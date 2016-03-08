angular.module('musicApp')
  .factory('userLogin', [function () {

    // var userName = vm.createUserName;

    function login (userName) {
      console.log(userName);
    }

    return {
      login: login
    }

  }])