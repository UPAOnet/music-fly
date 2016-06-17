declare const require;

export const RouteConfig = function (
  $stateProvider,
  $urlRouterProvider
  ) {
  'ngInject';
  console.log('routes are hooked up');

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
