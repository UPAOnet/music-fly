
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
    private playerControls,
    private numberConverter: INumberConverter
  ) {
    'ngInject';

    // this.animationTravelRate = null;
    // this.songLength = null;
    this.render();
    
  }

  $postLink() {
    this.entireBar = $(this.$element);
    this.progressWidth = (this.entireBar.outerWidth() - BUTTON_WIDTH);  
    this.stubbyBar = this.entireBar.find('.stubby-bar');
    
    this.$scope.$watch(() => this.playerControls.playState.playing,
    (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }

      if (!newValue) {
        console.log('PLAYER NEEDS TO RESET OR PAUSE');
        // this.resetProgressBar();
        return
      }
      this.getSongLength()
      this.startProgressBar();
    })

    // this.$scope.$watch(() => this.playerControls.playState.timerDuration, 
    // (newValue, oldValue) => {
      
    // })

  }

  /**
   * Sets the move rate of the duration bar
   */
  private getSongLength(): void {
    this.animationTravelRate = this.playerControls.playState.timerDuration;
  }

  private resetProgressBar () {
    this.stubbyBar.css({left:0});
  }
  
  /**
   * Starts the animation once all properties are set
   * Should always call this last 
   */
  private startProgressBar () {
    this.stubbyBar.animate({
      left: `${this.progressWidth}`
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
