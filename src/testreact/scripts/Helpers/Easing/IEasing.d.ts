interface IEasing {
    (currentIteration: number, startValue: number, changeInValue: number, totalIterations: number): number;
}