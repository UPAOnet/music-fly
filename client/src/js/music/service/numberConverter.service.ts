import {INumberConverter} from '../../interfaces/serviceInterface.ts';

export class NumberConverter implements INumberConverter {

    /**
     * Converts a number to seconds
     * time - number to convert
     */
    public convertToSeconds (time: number, unitOption: string) {
        let result: number;
        let convertFrom: number;
        let options = {
            milliseconds: 1000
        }

        if (options[unitOption]) {
            convertFrom = options[unitOption]
        } else {
            throw 'Specify a time unit to convert from in the unitOptions parameter'
        }

        result = (time/convertFrom);
        return result

    }
}
