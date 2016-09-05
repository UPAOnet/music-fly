
const Controller = function (
  $uibModal
) {
  'ngInject';
  var self = this;

  this.openDialog = function ($event) {
    $uibModal.open({
      // parent: parentEl,
      // targetEvent: $event,
      controller: SignUpModal,
      controllerAs: '$ctrl',
      templateUrl: require('./signUpModal.html')     
    });
  }

}

const SignUpModal = function (
  $mdDialog,
  $scope
) {
  'ngInject';

  // Form model
  this.user;

  this.submitForm = function () {
    console.log(this.user);
    console.log('SUBMIT')
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