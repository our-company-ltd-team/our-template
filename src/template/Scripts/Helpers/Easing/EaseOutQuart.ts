/// <reference path="ieasing.d.ts" />
var EaseOutQuart: IEasing = (currentIteration: number, startValue: number, changeInValue: number, totalIterations: number): number => {
    return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
}

export =EaseOutQuart;