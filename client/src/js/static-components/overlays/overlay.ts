declare const require


export const contentOverlay = function () {
  return {
    templateUrl: require('./overlay.html'),
    replace: true,
    transclude: true,
  }

}
