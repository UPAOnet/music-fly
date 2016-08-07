
export const RouteConfig = function (
  $stateProvider,
  $urlRouterProvider
  ) {
  'ngInject';

  $urlRouterProvider.otherwise('/');
  $stateProvider

    // Leave out home route until home page is done
    // .state('home', {
    //   url: '/',
    //   templateUrl: ('/js/views/home.html')
    // })

    .state('player', {
      url: '/',
      templateUrl: ('/js/views/player.html')
    })

  }
