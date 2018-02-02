"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="ieasing.d.ts" />
var EaseInOutSine = (currentIteration, startValue, changeInValue, totalIterations) => {
    return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
};
exports.default = EaseInOutSine;
