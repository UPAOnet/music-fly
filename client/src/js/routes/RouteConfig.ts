declare const require;

export const RouteConfig = function (
  $stateProvider,
  $urlRouterProvider
  ) {
  'ngInject';

  $urlRouterProvider.otherwise('/');
  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: ('/js/views/home.html')
    })

    .state('player', {
      url: '/player',
      templateUrl: ('/js/views/player.html')
    })

  }
