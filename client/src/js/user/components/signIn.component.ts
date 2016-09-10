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

  $rootScope.$on(musicEvents.login, (event, data) => {
    data === undefined ? this.authState = authStatus.failed : this.authState = authStatus.success;

    if (this.authState === 'success') {
      this.close();
    }
  })


}

const signIn = {
  templateUrl: require('./signIn.html'),
  controller: Controller
}

export default signIn;