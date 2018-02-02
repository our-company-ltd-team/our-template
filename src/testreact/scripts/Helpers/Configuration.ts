export var Title: string = document.title;

/** @const */
export var Verbose: boolean = true;

/** @const */
export var AnimationLength: number = 50;

/** @const */
export var StartpageURL: string = "/projets";

/** @const */
export var MouseWheelThreshold: number = 200;

/** @const */
export var _TransEndEventNames:{[key:string]:string}  = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd otransitionend',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
}

/** @const */
export var _TransEndNames:{[key:string]:string} = {
    'WebkitTransition': 'webkitTransition',
    'MozTransition': 'transition',
    'OTransition': 'oTransition',
    'msTransition': 'MSTransition',
    'transition': 'transition'
}

export var PointerAction: string = Modernizr.touchevents ? "touchend" : "click";

export var IsAndroid: boolean = /android/gi.test(navigator.userAgent);

export var IsiOS: boolean = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

export var IsIE: boolean = /(MSIE)/g.test(navigator.userAgent) || (navigator.appVersion && navigator.appVersion.indexOf('Trident/') > 0);

export var TransitionName: string = _TransEndNames[<string>Modernizr.prefixed('transition')];

export var TransitionEnd: string = _TransEndEventNames[<string>Modernizr.prefixed('transition')];

//export var Velocity: IPoint = { x: 0, y: 0 };
//export var Screen: IPoint = { x: window.innerWidth, y: window.innerHeight };

/** @const */
export var Dpr: number = window.devicePixelRatio || 1;