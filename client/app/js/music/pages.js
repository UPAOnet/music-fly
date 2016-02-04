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
  .factory('tabs', [function () {
    var tabSwitcher = {};

    tabSwitcher.switchTabs = function (tabAttribute) {
      var allPages = document.getElementsByClassName('music-page');
      var allTabs = document.getElementsByClassName('music-tab');    
      for (var i =0; i<allPages.length; i++) {
        allPages[i].classList.add('hidden');
        if (allPages[i].getAttribute('data-page') === tabAttribute) {
          allPages[i].classList.remove('hidden');
        }
      }
    }
  return tabSwitcher;
}])