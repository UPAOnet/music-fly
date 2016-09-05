export const Auth = function (
  apiUtils
) {
  'ngInject'
  var self = this;
  console.log('HELLO WORLD');
  
  return {
    createUser: createUser
  }

  function createUser (user) {
    console.log('creating user');
    console.log(user);
    apiUtils.post('new_account?', user);
  }
  

}