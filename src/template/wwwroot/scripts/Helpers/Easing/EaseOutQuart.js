define(["require", "exports"], function (require, exports) {
    "use strict";
    var EaseOutQuart = function (currentIteration, startValue, changeInValue, totalIterations) {
        return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
    };
    return EaseOutQuart;
});
