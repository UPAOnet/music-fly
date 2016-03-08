angular.module('musicApp')
  .controller('navController', navController); 

  navController.$inject = ['$scope', 'userLogin'];

  function navController ($scope, userLogin) {
    var vm = this;
    vm.loginName;
    vm.loginPassword;

    vm.login = function () {
      userLogin.login(vm.loginName, vm.loginPassword)
    }
  } 