export const Auth = function (
  apiUtils
) {
  'ngInject'
  var self = this;

  
  return {
    createUser: createUser,
    getUser: getUser
  }

  function createUser (user) {
    apiUtils.post('account', user);
  }

  function getUser() {
    apiUtils.get('account').then(function (data) {
      console.log(data);
    })
  }
  

}