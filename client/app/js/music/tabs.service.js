angular.module('musicApp')
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