declare const require: any;

class Controller {
  private showSideNav: boolean;
  private isOpen;
  private userScroll: number;

  constructor(
    private $scope,
    private $window,
    private userLogin,
    private $mdSidenav
  ) {
    'ngInject';

    // Services
    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;
    this.$window = $window;
    // this.userScroll = $window.pageYOffset;
    this.checkUserScroll();
  }

  private openLeftMenu () {
    if (this.$mdSidenav('left')) {
      this.showSideNav = !this.showSideNav;
    }

    this.$mdSidenav('left').toggle();
  }

  private checkUserScroll () {
    this.$scope.$watch(() => this.$window.pageYOffset, (newValue, oldValue) => {
      console.log(this.$window.pageYOffset);
    })
  }

}

export const navBar = {
  templateUrl: require('./navigation.html'),
  controller: Controller
}
