declare const require: any;

const angular = require('angular');

class Controller {
  private showSideNav: boolean;
  private navChangePoint: number;
  private showAltNav: boolean;
  private isOpen;
  private userScroll: number;
  private Angular;

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
    this.Angular = angular;
    // this.userScroll = $window.pageYOffset;
    this.navChangePoint = 170;
    this.showAltNav = true;
    this.checkUserScroll();
  }

  private openLeftMenu () {
    if (this.$mdSidenav('left')) {
      this.showSideNav = !this.showSideNav;
    }

    this.$mdSidenav('left').toggle();
  }

  private checkUserScroll () {
    // this.$scope.$watch(() => this.$window.pageYOffset, (newValue, oldValue) => {
    //   console.log(this.$window.pageYOffset);
    // })
    this.Angular.element(window).bind('scroll', function () {
      // if(window.pageYOffset > 170 && !this.showAltNav) {
      //   console.log('change');
      // } else if(){
      //   this.showAltNav = false;
      //   console.log('revert');
      // }

      this.showAltnav = window.pageYOffset > this.navChangePoint;
      console.log(window.pageYOffset);
      console.log(this.showAltnav);
    });
  }

}

export const navBar = {
  templateUrl: require('./navigation.html'),
  controller: Controller
}
