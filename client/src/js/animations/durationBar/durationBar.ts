
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
  private progressRate: number;

  private entireBarWidth: number;
  private timeElapsedWidth: number;
  private moveRight: number;
  

  public elapsedStyle: elapsedStyle;
  public buttonStyle: ButtonStyle;

  constructor (
    private $element,
    private $scope,
    private playerControls,
    private numberConverter: INumberConverter
  ) {
    'ngInject';
    
    // Services
    this.$element = $element;
    this.playerControls = playerControls;


    this.songLength = 15;
    this.timeElapsedWidth = 20;
    this.render();
    
    
  }

 
  $postLink() {
    this.entireBar = $(this.$element);
    this.entireBarWidth = this.entireBar.outerWidth();
    
    
    this.stubbyBar = this.entireBar.find('.stubby-bar');
    this.calculatePerSecond(this.songLength);
    

    this.$scope.$watch(() => this.playerControls.playState.playing,
    (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }

      if (!newValue) {
        this.resetProgressBar();
      }
      
      this.startProgressBar();
    })

  }

  private calculatePerSecond (songLength: number) {
    let rate;
    rate = (this.entireBarWidth / this.songLength);
    this.progressRate = rate;
    console.log(this.progressRate);
  }

  private resetProgressBar () {
    this.stubbyBar.css({left:0});
  }

  private startProgressBar () {
    this.stubbyBar.css({left:300});
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
      width: `${this.timeElapsedWidth}px`
    }
  }
}

export const durationBar = {
  controller: Controller,
  templateUrl: require('./durationBar.html')
}
