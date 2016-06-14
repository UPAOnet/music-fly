declare const require: any;

class Controller {
  constructor(
    private $scope,
    private userLogin
  ) {
    'ngInject';
    console.log("works");
  }
}

export const navBar = {
  template: require('./navigation.html'),
  controller: Controller
}




// angular.module('musicApp')
//   .controller('navController', navController);
//
//   navController.$inject = ['$scope', 'userLogin'];
//
//   function navController ($scope, userLogin) {
//     var vm = this;
//     vm.loginName;
//     vm.loginPassword;
//     vm.currentUser;
//     vm.test = "test";
//
//     vm.login = function () {
//       var login = userLogin.login(vm.loginName, vm.loginPassword);
//       login.then(function (res) {
//         if (res.status === 200) {
//           var resData = JSON.parse(res.config.data);
//           vm.currentUser = resData.userName;
//         }
//       })
//     }
//   }
