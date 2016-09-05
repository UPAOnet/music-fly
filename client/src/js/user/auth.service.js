export const Auth = function (
  apiUtils
) {
  'ngInject'
  var self = this;

  
  return {
    createUser: createUser
  }

  function createUser (user) {
    apiUtils.post('new_account?', user);
  }
  

}