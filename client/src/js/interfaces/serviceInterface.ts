export interface INumberConverter {
    convertToSeconds(time: number, unitOption: string): number;
}