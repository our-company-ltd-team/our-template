define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Title = document.title;
    exports.Verbose = true;
    exports.AnimationLength = 50;
    exports.StartpageURL = "/projets";
    exports.MouseWheelThreshold = 200;
    exports._TransEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    };
    exports._TransEndNames = {
        'WebkitTransition': 'webkitTransition',
        'MozTransition': 'transition',
        'OTransition': 'oTransition',
        'msTransition': 'MSTransition',
        'transition': 'transition'
    };
    exports.PointerAction = Modernizr.touchevents ? "touchend" : "click";
    exports.IsAndroid = /android/gi.test(navigator.userAgent);
    exports.IsiOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    exports.IsIE = /(MSIE)/g.test(navigator.userAgent) || (navigator.appVersion && navigator.appVersion.indexOf('Trident/') > 0);
    exports.TransitionName = exports._TransEndNames[Modernizr.prefixed('transition')];
    exports.TransitionEnd = exports._TransEndEventNames[Modernizr.prefixed('transition')];
    exports.Dpr = window.devicePixelRatio || 1;
});
