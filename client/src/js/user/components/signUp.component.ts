
const Controller = function (
  $uibModal
) {
  'ngInject';
  var self = this;

  this.openDialog = function ($event) {
    $uibModal.open({
      controller: SignUpModal,
      controllerAs: '$ctrl',
      templateUrl: require('./createUserModal.html')     
    });
  }

}

const SignUpModal = function (
  $mdDialog,
  $scope,
  auth
) {
  'ngInject';

  // Form model
  this.newUser;

  this.submitForm = function () {
    console.log(this.newUser);
    auth.createUser(this.newUser)
  }

  this.close = function () {
    $scope.$close();
  }

}

const signUp = {
  templateUrl: require('./signUp.html'),
  controller: Controller
}

export default signUp;