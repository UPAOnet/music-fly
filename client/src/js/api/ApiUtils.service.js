
export const ApiUtils = /*@ngInject*/ function (
  $http
) {

  const v1 = 'api/v1/'

  var api = {
    get: get,
    post: post
  }
  return api

  function get (path, data) {
    
    return $http({
      data: data,
      url: `${v1}${path}`,
      method: 'GET'
    })
  }

  function post (path, data) {
    // Post needs to transofrm because usually we're passing
    // in an object
    console.log(transformData(data));
    return $http({
      data: transformData(data),
      url: `${v1}${path}`,
      method: 'POST'
    })
  }

  function transformData (data) {
    if (data) {
      return JSON.stringify(data);
    }
  }

}


