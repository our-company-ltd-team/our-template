/// <reference path="ieasing.d.ts" />
var EaseInOutSine: IEasing = (currentIteration: number, startValue: number, changeInValue: number, totalIterations: number): number => {
    return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
}
export  default EaseInOutSine;