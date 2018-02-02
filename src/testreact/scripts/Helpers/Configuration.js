"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = document.title;
/** @const */
exports.Verbose = true;
/** @const */
exports.AnimationLength = 50;
/** @const */
exports.StartpageURL = "/projets";
/** @const */
exports.MouseWheelThreshold = 200;
/** @const */
exports._TransEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd otransitionend',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
};
/** @const */
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
//export var Velocity: IPoint = { x: 0, y: 0 };
//export var Screen: IPoint = { x: window.innerWidth, y: window.innerHeight };
/** @const */
exports.Dpr = window.devicePixelRatio || 1;
