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

  // Form model
  this.signInInfo

  this.submitForm = function () {
    console.log(this.signInInfo);
    auth.logIn(this.signInInfo);
  }

  this.close = function () {
    $scope.$close();
  }

  $rootScope.$on(musicEvents.login, (event, data) => {
    this.close();
  })


}

const signIn = {
  templateUrl: require('./signIn.html'),
  controller: Controller
}

export default signIn;