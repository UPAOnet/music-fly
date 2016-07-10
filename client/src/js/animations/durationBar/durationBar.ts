
import {INumberConverter} from '../../interfaces/serviceInterface.ts';

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

  private songLength: number;
  private durationLength: number;

  private entireBarWidth: number;
  private timeElapsedWidth: number;
  

  public elapsedStyle: elapsedStyle;
  public buttonStyle: ButtonStyle;

  constructor (
    private $element,
    private numberConverter: INumberConverter
  ) {
    'ngInject';
    
    // Services
    this.$element = $element;

    this.entireBar = this.$element.firstChild;
    console.log(this.entireBar);

    this.songLength = 15;
    this.durationLength;
    this.timeElapsedWidth = 20;
    this.render();
  }

  private calculateDuration (songLength: number) {

  }

  /**
   * Initializes the styles
   */
  private render (): void {
    
    this.buttonStyle = {
      width: `${BUTTON_WIDTH}px`,
      left: `${this.timeElapsedWidth}px`
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
