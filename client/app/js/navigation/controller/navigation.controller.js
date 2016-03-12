angular.module('musicApp')
  .controller('navController', navController); 

  navController.$inject = ['$scope', 'userLogin'];

  function navController ($scope, userLogin) {
    var vm = this;
    vm.loginName;
    vm.loginPassword;
    vm.currentUser;

    vm.login = function () {
      console.log(userLogin.login());
      // userLogin.login(vm.loginName, vm.loginPassword);
      userLogin.login().then (function (res) {
        if (res.status === 200) {
          var resData = JSON.parse(res.config.data);
          var user = resData.userName;
          
          vm.currentUser = user;
          console.log(vm.currentUser);

          // users.info.showLoginBtn = false;
          // users.info.user = user;
        }
      })
    }
  } 