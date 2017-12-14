/// <reference path="easing/ieasing.d.ts" />
import AnimationFrame = require("Helpers/AnimationFrame");
import EaseInOutSine = require("Helpers/Easing/EaseInOutSine");
/**
 * Helper class to handler animations using request animation frames
 *
 *
 * @class       Animator
 * @requires    AnimationFrame
 * @author      Our Company Ltd.
 * @description Creates an object calculating the value between two
 *              values using a number of frames and an easing function.
 * @version      0.1
 */
export class Engine {
    /** The start value. */
    private _From: number;

    /** Callback called on each animation frame. */
    private _OnFrame: (val: number) => void;

    /** Callback called when the animation is over. */
    private _OnEnd: (animator: Engine) => void;

    /** Easing function. */
    private _Easing: IEasing;

    /** the end value. */
    private _To: number;

    /** the number of frames of the animation. */
    private _Length: number;

    /** the numerical ID of the AnimationFrame object */
    private _Raf: number;

    /** the current frame number */
    private _Tick = 0;

    /** the current value */
    public Current: number;

    /**
     * @constructor
     * @param {number} from The start value
     * @param {number} to The end value
     * @param {number} length number of frames
     * @param {number} onFrame callback for each frame
     * @param {number} onEnd callback end of the animation
     * @param {number} easing Easing function
     */
    constructor(from: number, to: number, length: number, onFrame: (val: number) => void, onEnd: (animator: Engine) => void, easing: IEasing) {
        this._Easing = easing;
        this._OnEnd = onEnd;
        this._OnFrame = onFrame;
        this._Length = length;
        this._To = to;
        this._From = from;

        this.Current = from;
    }

    /**
     * Cancels the animation
     */
    public Cancel() {
        if (this._Raf) {
            AnimationFrame.Remove(this._Raf);
            this._Raf = null;
        }
    }

    /**
     * Starts the animation
     */
    public Start() {
        if (!this._Raf)
            this._Raf = AnimationFrame.Add(this._OnAnimationFrame.bind(this));

        AnimationFrame.Start();
    }

    /**
     * Modify the destination - Does not extend the animation time.
     * @param {number} to The end value
     */
    public Modify(to: number) {
        this._To = to;
        this._Length = this._Length - this._Tick;
        this._Tick = 0;
        this._From = this.Current;
    }

    /** requestAnimationFrame callback */
    private _OnAnimationFrame() {
        this.Current = this._Easing(this._Tick, this._From, this._To - this._From, this._Length);

        this._OnFrame(this.Current);

        this._Tick++;

        if (this._Tick >= this._Length) {
            this._OnAnimationEnd();
        }
    }

    /** callback when the animation is done */
    private _OnAnimationEnd() {
        if (this._Raf) {
            AnimationFrame.Remove(this._Raf);
            this._Raf = null;
        }

        this._Tick = 0;
        this._OnEnd(this);
    }
}
interface IPoint {
    x: number;
    y: number;
}
export class Engine2D {
    /** The start value. */
    private _From: IPoint;

    /** Callback called on each animation frame. */
    private _OnFrame: (val: IPoint) => void;

    /** Callback called when the animation is over. */
    private _OnEnd: (animator: Engine2D) => void;

    /** Easing function. */
    private _Easing: IEasing;

    /** the end value. */
    private _To: IPoint;

    /** the number of frames of the animation. */
    private _Length: number;

    /** the numerical ID of the AnimationFrame object */
    private _Raf: number;

    /** the current frame number */
    private _Tick = 0;

    /** the current value */
    public Current: IPoint;

    /**
     * @constructor
     * @param {number} from The start value
     * @param {number} to The end value
     * @param {number} length number of frames
     * @param {number} onFrame callback for each frame
     * @param {number} onEnd callback end of the animation
     * @param {number} easing Easing function
     */
    constructor(from: IPoint, to: IPoint, length: number, onFrame: (val: IPoint) => void, onEnd: (animator: Engine2D) => void, easing: IEasing) {
        this._Easing = easing;
        this._OnEnd = onEnd;
        this._OnFrame = onFrame;
        this._Length = length;
        this._To = to;
        this._From = from;

        this.Current = from;
    }

    /**
     * Cancels the animation
     */
    public Cancel() {
        if (this._Raf) {
            AnimationFrame.Remove(this._Raf);
            this._Raf = null;
        }
    }

    /**
     * Starts the animation
     */
    public Start() {
        if (!this._Raf)
            this._Raf = AnimationFrame.Add(this._OnAnimationFrame.bind(this));

        AnimationFrame.Start();
    }

    /**
     * Modify the destination - Does not extend the animation time.
     * @param {number} to The end value
     */
    public Modify(to: IPoint) {
        this._To = to;
        this._Length = this._Length - this._Tick;
        this._Tick = 0;
        this._From = this.Current;
    }

    /** requestAnimationFrame callback */
    private _OnAnimationFrame() {
        this.Current =
            {
                x: this._Easing(this._Tick, this._From.x, this._To.x - this._From.x, this._Length),
                y: this._Easing(this._Tick, this._From.y, this._To.y - this._From.y, this._Length)
            };

        this._OnFrame(this.Current);

        this._Tick++;

        if (this._Tick >= this._Length) {
            this._OnAnimationEnd();
        }
    }

    /** callback when the animation is done */
    private _OnAnimationEnd() {
        if (this._Raf) {
            AnimationFrame.Remove(this._Raf);
            this._Raf = null;
        }

        this._Tick = 0;
        this._OnEnd(this);
    }
}