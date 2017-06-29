define(["require", "exports"], function (require, exports) {
    "use strict";
    var Linear = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * currentIteration / totalIterations + startValue;
    };
    return Linear;
});
