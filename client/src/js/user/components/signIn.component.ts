import {MusicEvents} from '../../music/constants/musicEvents.ts'

const Controller = function (
  $uibModal,
  auth
) {
  'ngInject';
  var self = this;

  this.openDialog = function ($event) {
    $uibModal.open({
      controller: AuthModal,
      controllerAs: '$ctrl',
      templateUrl: require('./signInModal.html')     
    });
  }

}

const AuthModal = function (
  $mdDialog,
  $scope,
  auth,
  musicEvents: MusicEvents,
  $rootScope: ng.IRootScopeService
) {
  'ngInject';
  const self = this;

  const authStatus = {
    success: 'success',
    failed: 'failed'
  }

  // Form model
  this.signInInfo

  // Validity state
  this.authState;

  this.submitForm = function () {
    auth.logIn(this.signInInfo);
  }

  this.close = function () {
    $scope.$close();
  }

  $scope.$on(musicEvents.login, (event, data) => {
    this.authState = authStatus.success;  
    this.close();
  })

  $scope.$on(musicEvents.loginFailed, (event, data) => {
    if (data.status === 400) {
      this.authState = authStatus.failed
    }
  })


}

const signIn = {
  templateUrl: require('./signIn.html'),
  controller: Controller
}

export default signIn;