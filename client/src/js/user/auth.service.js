export const Auth = function (
  apiUtils
) {
  'ngInject'
  var self = this;

  
  return {
    createUser: createUser
  }

  function createUser (user) {
    apiUtils.post('account/new', user);
  }

  function currentUser() {
    apiUtils.get('account/current')
  }
  

}