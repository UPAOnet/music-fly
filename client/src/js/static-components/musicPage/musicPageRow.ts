// Row components for the music pages

export const MusicPageRow = function () {
  return {
    templateUrl: require('./musicPageRow.html'),
    transclude: true,
    restrict: 'A',
    scope: {
      header: '@'
    }
  }
}
