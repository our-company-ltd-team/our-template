var Easing;
(function (Easing) {
    Easing.EaseInQuad = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
    };
    Easing.EaseOutQuad = function (currentIteration, startValue, changeInValue, totalIterations) {
        return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue;
    };
    Easing.EaseInOutQuad = function (currentIteration, startValue, changeInValue, totalIterations) {
        if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * currentIteration * currentIteration + startValue;
        }
        return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
    };
    Easing.EaseInCubic = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
    };
    Easing.EaseOutCubic = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
    };
    Easing.EaseInOutCubic = function (currentIteration, startValue, changeInValue, totalIterations) {
        if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
        }
        return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
    };
    Easing.EaseInQuart = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * Math.pow(currentIteration / totalIterations, 4) + startValue;
    };
    Easing.EaseInOutQuart = function (currentIteration, startValue, changeInValue, totalIterations) {
        if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * Math.pow(currentIteration, 4) + startValue;
        }
        return -changeInValue / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
    };
    Easing.EaseInQuint = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * Math.pow(currentIteration / totalIterations, 5) + startValue;
    };
    Easing.EaseOutQuint = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue;
    };
    Easing.EaseInOutQuint = function (currentIteration, startValue, changeInValue, totalIterations) {
        if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * Math.pow(currentIteration, 5) + startValue;
        }
        return changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
    };
    Easing.EaseInSine = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue;
    };
    Easing.EaseOutSine = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue;
    };
    Easing.EaseInExpo = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue;
    };
    Easing.EaseOutExpo = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
    };
    Easing.EaseInOutExpo = function (currentIteration, startValue, changeInValue, totalIterations) {
        if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
        }
        return changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
    };
    Easing.EaseInCirc = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue;
    };
    Easing.EaseOutCirc = function (currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue;
    };
    Easing.EaseInOutCirc = function (currentIteration, startValue, changeInValue, totalIterations) {
        if ((currentIteration /= totalIterations / 2) < 1) {
            return changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
        }
        return changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
    };
})(Easing || (Easing = {}));
