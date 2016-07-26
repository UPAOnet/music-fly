/* Handles search functionality */

class Controller {
  private tracks: any;
  private searchQuery: string;

  constructor (
    private $scope: ng.IScope,
    private $q,
    private $rootScope: ng.IRootScopeService,
    private spotifySearch,
    private scSearch,
    private searchType,
    private musicEvents,
    private TrackList,
    private $timeout,
    private $window
  ) {
    'ngInject';

    this.$scope.$on(this.musicEvents.featuredSearch, (event, search) => {
      this.searchQuery = search;
      this.search();
    })

  }

  /**
   * Emits search results 
   * @event NEW_SEARCH
   */
  private emitSearchResults (songList) {
    this.$scope.$emit(this.musicEvents.newSearch, songList);
  } 

  /**
   * Search functionality
   */
    private search () {
      let spotifyTracks;
      let soundcloudTracks;    

      Promise.all([this.soundCloudSearchQuery(), this.spotifySearchQuery() ])
        .then( (results) => {

          spotifyTracks = this.TrackList.formatTracks(results[1].data.tracks.items, 'spotify');
          soundcloudTracks = this.TrackList.formatTracks(results[0], 'soundcloud');
          this.tracks = this.combineResults(soundcloudTracks, spotifyTracks);
          this.searchQuery = "";
          this.emitSearchResults(this.tracks);
          console.log(this.tracks);
          this.$scope.$apply();
      })         
    }

  /**
   * Puts search results in a payload
   */
  private combineResults (soundcloud, spotify) {
    let combined = [];
    combined[0] = soundcloud;
    combined[1] = spotify;
    return combined;
  }
  /**
   * Search functionality for spotify songs
   */
  private spotifySearchQuery () {
    let spotifyTracks = this.spotifySearch.makeRequest(this.searchQuery);
    return spotifyTracks  
  }

  /**
   * Search for soundcloud
   * 
   */
  private soundCloudSearchQuery = function () {  
    return this.scSearch.allTracks(this.searchQuery);
  };

  /** Search event from input field
   * {event} - Enter keypress event, used for input fields
   */
  public searchEnter (event?: any) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

}

export const MusicSearch = {
  templateUrl: require('./musicSearch.html'),
  controller: Controller
}

