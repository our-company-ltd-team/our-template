"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="ieasing.d.ts" />
var EaseOutQuart = (currentIteration, startValue, changeInValue, totalIterations) => {
    return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
};
exports.default = EaseOutQuart;
