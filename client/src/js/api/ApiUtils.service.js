
export const ApiUtils = /*@ngInject*/ function (
  $http
) {

  const v1 = 'api/v1/'

  var api = {
    get: get
  }
  return api

  function get (path, data) {
 
    return $http({
      data: data,
      url: `${v1}${path}`,
      method: 'GET'
    })
  }  
}


