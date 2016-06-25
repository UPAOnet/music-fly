declare const require: any;

const angular = require('angular');

class Controller {
  private showSideNav: boolean;
  private navChangePoint: number;
  private showAltNav: boolean;
  private isHomePage: boolean;
  private userScroll: number;
  private Angular;
  private isOpen;

  constructor(
    private $scope,
    private $rootScope,
    private $location,
    private $window,
    private $timeout,
    private userLogin,
    private $mdSidenav
  ) {
    'ngInject';

    // Services
    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;
    this.$window = $window;
    this.Angular = angular;

    // Controller props
    this.showAltNav = null;
    this.isHomePage = null;
    this.checkUserScroll();
    this.checkForHome();

  }

  private openLeftMenu () {
    if (this.$mdSidenav('left')) {
      this.showSideNav = !this.showSideNav;
    }
    this.$mdSidenav('left').toggle();
  }

  /**
   * Enables alt nav if not on home page
   */
  private checkForHome () {
    this.$rootScope.$on('$viewContentLoading',
      (event, toState, toParams, fromState, fromParams, options) => {
        this.isHomePage = (this.$location.url() === '/')
        this.showAltNav = (this.$location.url() !== '/');
      }
    )
  }

 /**
  * Binds scroll event to determine which main nav to show
  */
  private checkUserScroll () {
    const navChangePoint = 170
    this.Angular.element(window).bind('scroll', () => {

      if (this.isHomePage) {
        // Timeout set to make sure digest is called
        this.$timeout(() => this.showAltNav = window.pageYOffset > navChangePoint);
      }
    });
  }

}

export const navBar = {
  templateUrl: require('./navigation.html'),
  controller: Controller
}
