angular.module('musicApp')
  .factory('voice', [function () {
    var voice = {};
    voice.initialize = function () {
      if (annyang) {
        var commands = {
          'search *query': function search (query) {
            vm.voiceSearch(query);
          },
          'start': function start () {
            vm.togglePlay();
          },
          'play': function play () {
            vm.voicePlay();
          },        
          'stop': function pause() {
            vm.voicePause();
          },
          ':nomatch': function none (message) {
            console.log('no recognized command')
            return
          }
        };
        annyang.addCommands(commands);
        annyang.start();
      }  
    }
  return voice
}])