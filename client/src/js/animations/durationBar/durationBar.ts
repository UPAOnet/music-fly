
import {INumberConverter} from '../../interfaces/serviceInterface.ts';

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

  private entireBar: any;
  private stubbyBar: any;
  private elapsedBar: any;

  private songLength: number;
  private animationTravelRate: number;

  private progressWidth: number;
  private moveRight: number;
  
  // How far the bar will have to travel
  public elapsedStyle: elapsedStyle;
  public buttonStyle: ButtonStyle;

  constructor (
    private $element,
    private $scope,
    private $rootScope,
    private playerControls,
    private musicEvents,
    private numberConverter: INumberConverter
  ) {
    'ngInject';

    /**
     * Resets bar data based on new song selection
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
    this.animationTravelRate = songDuration;
  }

  /**
   * Resets the bar animations
   */
  private resetProgressBar () {
    this.stubbyBar.stop();
    this.elapsedBar.stop();
    this.stubbyBar.css({left:0});
    this.elapsedBar.css({width:0});
    
  }
  
  /**
   * Starts the animation once all properties are set
   * Should always call this last 
   */
  private startProgressBar () {
    
    this.progressWidth = (this.entireBar.outerWidth());
    this.stubbyBar.animate({
      left: `${this.progressWidth}`
    }, this.animationTravelRate, 
       'linear', 
       () => {
        this.resetProgressBar();
       })

    this.elapsedBar.animate({
      width: `${this.progressWidth}`
    }, this.animationTravelRate, 
       'linear', 
       () => {
        this.resetProgressBar();
       })
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
