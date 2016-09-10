export const Auth = function (
  apiUtils,
  $rootScope,
  musicEvents
) {
  'ngInject'
  var self = this;
  var user = {};

  // Gets stored session upon load if any
  checkSession().then(function (result) {
    if (result) {
      updateUser(result.data);
    }
  });
  
  return {
    createUser: createUser,
    getUser: getUser,
    logOut: logOut,
    logIn: logIn
  }

  function updateUser (userInfo) {
    user = userInfo;
    $rootScope.$broadcast(musicEvents.login, userInfo);
  }

  function createUser (user) {
    apiUtils.post('account', user).then((result) => {
      updateUser(result.data)
    });
  }

  function checkSession() {
    return apiUtils.get('account');
  }

  function getUser() {
    return user;
  }

  function logOut () {
    apiUtils.post('account/logout').then(() => {
      $rootScope.$broadcast(musicEvents.logout);
    });
  }

  function logIn (user) {
    apiUtils.post('account/login', user).then((result) => {
      updateUser(result.data);
    });
  }
  

}