import {MusicEvents} from '../../music/constants/musicEvents.ts'


const Controller = function (
  $uibModal,
  auth
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
  auth,
  musicEvents: MusicEvents,
  $rootScope: ng.IRootScopeService
) {
  'ngInject';

  this.errors;

  // Form model
  this.newUser;

  this.submitForm = function () {
    auth.createUser(this.newUser)
  }

  this.close = function () {
    $scope.$close();
  }

  $scope.$on(musicEvents.login, (event, data) => {
    this.close();
  })

  $scope.$on(musicEvents.loginFailed, (event, data) => {
    if (data === 500) {
      this.errors = 'Sorry, that username is already taken';
    }
  })


}

const signUp = {
  templateUrl: require('./signUp.html'),
  controller: Controller
}

export default signUp;