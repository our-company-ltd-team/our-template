"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="ieasing.d.ts" />
var Linear = (currentIteration, startValue, changeInValue, totalIterations) => {
    return changeInValue * currentIteration / totalIterations + startValue;
};
exports.default = Linear;
