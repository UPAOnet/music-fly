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
      this.search(search);
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
    private search (search?: string) {
      let spotifyTracks;
      let soundcloudTracks;    
      let query;

      search ? query = search : query = this.searchQuery;

      Promise.all([this.soundCloudSearchQuery(query), this.spotifySearchQuery(query) ])
        .then( (results) => {
          spotifyTracks = this.TrackList.formatTracks(results[1].data.tracks.items, 'spotify');
          soundcloudTracks = this.TrackList.formatTracks(results[0], 'soundcloud');
          this.tracks = this.combineResults(soundcloudTracks, spotifyTracks);
          this.searchQuery = "";
          this.emitSearchResults(this.tracks);
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
  private spotifySearchQuery (query) {
    let spotifyTracks = this.spotifySearch.makeRequest(query);
    return spotifyTracks  
  }

  /**
   * Search for soundcloud
   * 
   */
  private soundCloudSearchQuery = function (query) {  
    return this.scSearch.allTracks(query);
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

