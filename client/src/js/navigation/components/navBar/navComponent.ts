declare const require: any;

class Controller {
  private showSideNav: boolean;
  private isOpen;
  constructor(
    private $scope,
    private userLogin,
    private $mdSidenav
  ) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;

  }

  openLeftMenu () {
    if (this.$mdSidenav('left')) {
      this.showSideNav = !this.showSideNav;
    }

    this.$mdSidenav('left').toggle();
  }
}

export const navBar = {
  templateUrl: require('./navigation.html'),
  controller: Controller
}
