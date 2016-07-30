// Row components for the music pages
export const MusicPageRow = {
  templateUrl: require('./musicPageRow.html'),
  transclude: true,
  bindings: {
    // Binding for any header text
    header: '@',
    company: '@?'
  }
}
