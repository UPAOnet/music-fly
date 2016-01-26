angular.module('musicApp', [])

.controller('musicPlayer', ['$scope','$http', 'spotifySearch', 'playerControls', 'scSearch',
  function ($scope, $http, spotifySearch, playerControls, scSearch) {
    vm = this; 
    vm.playerTitle;
    vm.playerArtist;
    vm.playerInfo;
    vm.tracks = []; 
    $scope.spotifyQuery;
    $scope.scQuery;

    $scope.playMusic = function () {
      playerControls.play();
    }
    $scope.pauseMusic = function () {
      playerControls.pause();
    }


    $scope.playSpotifyMusic = function (song) {
      playerControls.playSpotifyMusic(song);   
    } 
    $scope.playSoundCloud = function (song) {
      playerControls.playSoundCloud(song);
      // playerControls.playSoundCloud(song).then(function (player) {
        
      // });   
    }


    $scope.scSearch = function () {
      scSearch.allTracks($scope.scQuery);
    }
    $scope.scSearchEnter = function () {
      if (event.keyCode === 13) {
        scSearch.allTracks($scope.scQuery);
      };
    }


    $scope.spotifySearch = function () {
      spotifySearch.makeRequest($scope.spotifyQuery);

    }
    $scope.spotifySearchEnter = function () {
      if (event.keyCode === 13) {
        spotifySearch.makeRequest($scope.spotifyQuery);
      }
    }    
  }])

.service('songConstructor', [function () {
  function song (name, image, album, artist, duration, source, urlSource, pageSource) {
    this.name = name;
    this.image = image;
    this.album = album;
    this.artist = artist;
    this.duration = duration;
    this.source = source; 
    this.urlSource = urlSource;
    this.pageSource = pageSource;
  }
  return song; 
}])



.factory('spotifySearch', ['$http', 'songConstructor', function ($http, songConstructor) {
    var search = {};
    search.makeRequest = function (input) {
      var query = JSON.stringify({queryInput: input})
      $http({
        data: query,
        url: 'http://localhost:3000/spotify',
        method: 'POST',
      }).then(function success (response) {
        vm.tracks = [];
        trackResults = response.data.tracks.items;
        // console.log(trackResults);
        _.map(trackResults, function (each) {
          vm.tracks.push(
            new songConstructor(each.name, each.album.images[2].url, each.album.name, each.artists[0].name, each.duration_ms, 'spotify', each.preview_url, each.external_urls.spotify)
          );
        })
        // console.log(vm.tracks);  
      }) 
    } 
    return search;
  }])

.factory('scSearch', ['songConstructor', function (songConstructor) {
  var search = {}; 

  search.allTracks = function (input) {
    var query = input;

    SC.get('/tracks', {q: query, limit: 20}).then(function(tracks) {
      vm.tracks = [];
      var trackResults = tracks;

      _.map(trackResults, function (each) {
        var stream = each.stream_url;

        function getUrl (stream) {
          var urlNumber = stream.slice(-16, -7)
          SC.stream('/tracks/' + urlNumber).then(function (player) {
            vm.tracks.push(
              new songConstructor(each.title, each.artwork_url, each.album, each.user.username, each.duration, 'sc', player.streamInfo.url, each.permalink_url)
            )
          });
        }        
      })
      
    })
  };
  return search
}])

.factory('playerControls', [function () { 
    var masterPlayer = new Audio();
    masterPlayer.playSpotifyMusic = function (song) {
      _.each(vm.tracks, function (eachSong) {
        if (eachSong.name === song) {
          vm.playerTitle = eachSong.name;
          vm.playerArtist = eachSong.artist;
          vm.playerInfo = eachSong.album;
          masterPlayer.src = eachSong.urlSource;
        }               
      })
      masterPlayer.play()            
    }

    masterPlayer.playSoundCloud = function (song) {
      
      
      masterPlayer.soundCloud = SC.stream;
      // console.log(masterPlayer.soundCloud);
      masterPlayer.soundCloud
    }

    return masterPlayer
  }])

.directive('songList', () => {
    return {
      scope: true,
      restrict: 'A',
      replace: false,
      template: '<li class="songs" ng-repeat= "track in player.tracks" ng-click="song-select" data-song = {{track.name}} data-source ={{track.source}}>' +
                '<img ng-src="{{track.image}}"/> {{track.name}} {{track.artist}} {{track.album}}' +
                '</li>',
      link: function (scope, elem, attrs) {
        elem.bind('click', function (event) {
          var song = event.target
          $('.songs').removeClass('highlight');
          song.classList.add('highlight');
        });

        elem.bind('dblclick', function (event) {
          var song = event.target.getAttribute('data-song')
          if (event.target.getAttribute('data-source') === 'spotify') {
            scope.playSpotifyMusic(song);
          }
          if (event.target.getAttribute('data-source') === 'sc') {
            scope.playSoundCloud(song);

          }
        })
      }
    }
  })

SC.initialize({
  client_id: 'b10a9e77003de676a40bcd4ce7346f03'
})



// https://cf-media.sndcdn.com/p7Uw60gtODDZ.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vcDdVdzYwZ3RPRERaLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NTM4NTA1NzR9fX1dfQ__&Signature=sOYC2N6DXNSTj-XpEWDVftOM9l-RnPVsFifGmmTl65IeexGKYQs8jWBRvLpk9IFHmrJuzvlZkLiiJ7iKzbLSG4v3HgCV~Ou8Hvjzj4PpXUPpEfVMfKCNl6mNr-5sRcJn5fdq0xYSCDcpZiRXoClndM2LZYE0OcJswJk4sQJTlQjvFsRAktZS-py6MXuDYdtb5sIGRcMz7CrtAk9Fdnf9F56l~teZx7GeMve3Unb34iVRfKRYosI8f-W7k~7m9R-GudqHJBJg9NBHLPQplYXPurUJWs4owThfaG~PG7hlJffGOreqwT40VohsEZb011WPbCEpVzVXZ4LnivRtxxz8bw__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ
