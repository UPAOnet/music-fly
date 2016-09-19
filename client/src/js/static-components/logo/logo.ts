declare const require: any;

class Controller {
  constructor (
    private $rootScope:ng.IRootScopeService,
    private musicEvents
  ) {
    'ngInject';
  }
  public returnHome () {
    this.$rootScope.$broadcast(this.musicEvents.featuredPage);
  }
}

export const logo = {
  controller: Controller,
  templateUrl: require('./logo.html')
}
