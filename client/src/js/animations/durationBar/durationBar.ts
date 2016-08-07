/**
 * @file Handles song duration logic on duration bar. 
 */

import {INumberConverter} from '../../interfaces/serviceInterface.ts';
import {MusicEvents} from '../../music/constants/musicEvents.ts'
import {PlayerControls} from '../../music/service/PlayerControls.service.ts';

const angular = require('angular');
const _ = require('lodash');
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
  private interfaceState: boolean;

  // Affected styles
  public elapsedStyle: elapsedStyle;
  public buttonStyle: ButtonStyle;

  private Angular

  constructor (
    private $element: ng.IRootElementService,
    private $scope: ng.IScope,
    private $rootScope:ng.IRootScopeService,
    private playerControls: PlayerControls,
    private musicEvents: MusicEvents,
    private numberConverter: INumberConverter,
    private $timeout: ng.ITimeoutService   
  ) {
    'ngInject';

    this.Angular = angular;
  }

  
  $onInit() {

    /**
     * Sets a timer to cache how much more time the song has
     */
    window.setInterval(() => {
      if (!this.isPaused && this.animationDuration > 0) {
        this.animationDuration = (this.animationDuration - 1000);
      }
    }, 1000);

    // Waits for interface to fully load before starting animation
    this.$scope.$watch (() => this.interfaceState, 
    (newVal, oldval) => {
      newVal ? this.startProgressBar() : this.resetProgressBar();    
    })

    /**
     * Resets bar data if a new song is loaded in the player
     * @listens SONG_SELECTED
     */
    this.$rootScope.$on(this.musicEvents.songSelected, (event, data) => {
      if (!data) {return}     
      this.getSongLength(data.duration);

      // Passes responsibility to the watch function if interface
      // is not fully loaded. This fixes bar not starting on initial load. 
      if (!this.interfaceState) {return}
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
    this.setReadjust();
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
   * Readjusts animation, but not setting isPaused to false
   * Because the song is not actually paused
   */
  private readjustProgress () {
    this.stubbyBar.stop();
    this.elapsedBar.stop();
    this.startProgressBar();
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
  * Binds resize event to determine if progress bar needs to readjust
  */
  private setReadjust () {
    this.Angular.element(window).bind('resize', _.debounce( () => {
        this.readjustProgress();
      }, 500)
    );
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
  templateUrl: require('./durationBar.html'),
  bindings: {
    interfaceState: '<'
  }
}
