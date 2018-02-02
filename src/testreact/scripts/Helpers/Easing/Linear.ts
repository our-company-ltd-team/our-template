/// <reference path="ieasing.d.ts" />
var Linear: IEasing = (currentIteration: number, startValue: number, changeInValue: number, totalIterations: number): number => {
    return changeInValue * currentIteration / totalIterations + startValue;
}
export  default Linear;