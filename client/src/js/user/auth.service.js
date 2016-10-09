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
    if (result.status === 200) {
      updateUser(result.data);
    }
  });
  
  return {
    createUser: createUser,
    getUser: getUser,
    logOut: logOut,
    logIn: logIn
  }

  /**
   * Caches current user and notfifies components
   */
  function updateUser (userInfo) {
    user = userInfo;
    $rootScope.$broadcast(musicEvents.login, userInfo);    
  }

  /**
   * Sends event for errors
   */
  function handleLoginError (error) {
    user = undefined;
    if (error.status === 400) {
       $rootScope.$broadcast(musicEvents.loginFailed, error);
    }
  }

  function createUser (user) {
    apiUtils.post('account', user)
      .then((result) => {
        updateUser(result.data)
      })
      .catch((result) => {
        if (result.status === 500) {
          $rootScope.$broadcast(musicEvents.loginFailed, result.status);
        }
      })
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
    apiUtils.post('account/login', user)
      .then((result) => {
        updateUser(result.data);
      })
      .catch((e) => {
        handleLoginError(e);
      })
  }
  

}