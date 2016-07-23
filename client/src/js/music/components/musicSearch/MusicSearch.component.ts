/* Handles search functionality */

class Controller {
  private tracks: any;
  private searchQuery: string;

  constructor (
    private $scope,
    private $q,
    private spotifySearch,
    private scSearch,
    private searchType,
    private musicEvents,
    private TrackList,
    private $timeout,
    private $window
  ) {
    'ngInject';
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
   * {event} - Enter keypress event
   */
    public search (event) {
      let spotifyTracks;
      let soundcloudTracks;    

      if (event.keyCode === 13) {

        Promise.all([this.soundCloudSearchQuery(), this.spotifySearchQuery() ])
          .then( (results) => {

            spotifyTracks = this.TrackList.formatTracks(results[1].data.tracks.items, 'spotify');
            soundcloudTracks = this.TrackList.formatTracks(results[0], 'soundcloud');
            this.tracks = this.combineResults(soundcloudTracks, spotifyTracks);
            this.searchQuery = "";
            this.emitSearchResults(this.tracks);
            this.$scope.$apply();
        })
      }      
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
  public spotifySearchQuery () {
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
}

export const MusicSearch = {
  templateUrl: require('./musicSearch.html'),
  controller: Controller
}

