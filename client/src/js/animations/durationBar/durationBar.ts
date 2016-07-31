/**
 * @file Handles song duration logic for the view. 
 */

import {INumberConverter} from '../../interfaces/serviceInterface.ts';
import {MusicEvents} from '../../music/constants/musicEvents.ts'
import {PlayerControls} from '../../music/service/PlayerControls.service.ts';

const angular = require('angular');
const BUTTON_WIDTH: number = 30;

interface ButtonStyle {
  width: string;
  left: string;
}

interface elapsedStyle {
  width: string;
}

class Controller {

  // Bar Elements
  private entireBar: any;
  private stubbyBar: any;
  private elapsedBar: any;

  // Duration data
  private songLength: number;
  private animationDuration: number;
  private progressWidth: number;
  private moveRight: number;
  private isPaused: boolean;

  // Affected styles
  public elapsedStyle: elapsedStyle;
  public buttonStyle: ButtonStyle;

  constructor (
    private $element: ng.IRootElementService,
    private $scope: ng.IScope,
    private $rootScope:ng.IRootScopeService,
    private playerControls: PlayerControls,
    private musicEvents: MusicEvents,
    private numberConverter: INumberConverter
  ) {
    'ngInject';
  }

  $onInit() {

    /**
     * Sets an interval to cache how much more time the song has
     */
    window.setInterval(() => {
      if (!this.isPaused && this.animationDuration > 0) {
        this.animationDuration = (this.animationDuration - 1000);
        console.log(this.animationDuration); 
      }
    }, 1000);

    /**
     * Resets bar data if a new song is loaded in the player
     * @listens SONG_SELECTED
     */
    this.$rootScope.$on(this.musicEvents.songSelected, (event, data) => {
      if (!data) {
        return
      }     
      this.getSongLength(data.duration);
      this.resetProgressBar();
      this.startProgressBar();
    })

    /**
     * Listen for player pauses
     * @listens song pauses
     */
    this.$rootScope.$on(this.musicEvents.songPause, (event, data) => {
      this.stopProgress();
    })

    /**
     * Listens for player resumes
     * @listens song play
     */
    this.$rootScope.$on(this.musicEvents.songPlay, (event, data) => {
      this.startProgressBar();
    })

    this.render();
  }

  $postLink() {
    this.entireBar = $(this.$element);  
    this.stubbyBar = this.entireBar.find('.stubby-bar');
    this.elapsedBar = this.entireBar.find('.time-elapsed-bar');
  }

  /**
   * Sets the move rate of the duration bar
   * songDuration - length of song
   */
  private getSongLength(songDuration: number): void {
    this.animationDuration = songDuration;
  }

  /**
   * Resets the bar animations
   */
  private resetProgressBar () {
    this.stopProgress();
    this.stubbyBar.css({left:0});
    this.elapsedBar.css({width:0});    
  }

  /**
   * Cancels the progress animation
   */
  private stopProgress () {
    this.isPaused = true;
    this.stubbyBar.stop();
    this.elapsedBar.stop();
  }
  
  /**
   * Starts the animation once all properties are set
   * Should always call this last 
   */
  private startProgressBar () {
    
    this.progressWidth = (this.entireBar.outerWidth());
    this.stubbyBar.animate({
      left: `${this.progressWidth}`
    }, this.animationDuration, 
       'linear', 
       () => {
        this.resetProgressBar();
       })

    this.elapsedBar.animate({
      width: `${this.progressWidth}`
    }, this.animationDuration, 
       'linear', 
       () => {
        this.resetProgressBar();
       })

    this.isPaused = false;
  }

  /**
   * Initializes the styles
   */
  private render (): void {
    
    this.buttonStyle = {
      width: `${BUTTON_WIDTH}px`,
      left: `0px`
    }

    this.elapsedStyle = {
      width: `${this.songLength}px`
    }
  }
}

export const durationBar = {
  controller: Controller,
  templateUrl: require('./durationBar.html')
}
