angular.module('musicApp')
  .factory('searchType', [function () {
    var search = {};    
    search.searchState = {
      sc: true,
      spotify: false
    };

    search.changeSearch = function (attribute) {
      
      if (attribute === 'sc' && search.searchState.sc === false) {
        search.searchState.sc = true;
        search.searchState.spotify = false;
      }
      else if (attribute === 'spotify' && search.searchState.spotify === false) {
        search.searchState.spotify = true;
        search.searchState.sc = false;
      }
    }
    return search
  }])
  