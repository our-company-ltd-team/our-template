define(["require", "exports"], function (require, exports) {
    "use strict";
    var EaseInOutSine = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
    };
    return EaseInOutSine;
});
