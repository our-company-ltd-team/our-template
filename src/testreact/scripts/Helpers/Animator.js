"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnimationFrame = require("./AnimationFrame");
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
class Engine {
    /**
     * @constructor
     * @param {number} from The start value
     * @param {number} to The end value
     * @param {number} length number of frames
     * @param {number} onFrame callback for each frame
     * @param {number} onEnd callback end of the animation
     * @param {number} easing Easing function
     */
    constructor(from, to, length, onFrame, onEnd, easing) {
        /** the current frame number */
        this._Tick = 0;
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
    Cancel() {
        if (this._Raf) {
            AnimationFrame.Remove(this._Raf);
            this._Raf = null;
        }
    }
    /**
     * Starts the animation
     */
    Start() {
        if (!this._Raf)
            this._Raf = AnimationFrame.Add(this._OnAnimationFrame.bind(this));
        AnimationFrame.Start();
    }
    /**
     * Modify the destination - Does not extend the animation time.
     * @param {number} to The end value
     */
    Modify(to) {
        this._To = to;
        this._Length = this._Length - this._Tick;
        this._Tick = 0;
        this._From = this.Current;
    }
    /** requestAnimationFrame callback */
    _OnAnimationFrame() {
        this.Current = this._Easing(this._Tick, this._From, this._To - this._From, this._Length);
        this._OnFrame(this.Current);
        this._Tick++;
        if (this._Tick >= this._Length) {
            this._OnAnimationEnd();
        }
    }
    /** callback when the animation is done */
    _OnAnimationEnd() {
        if (this._Raf) {
            AnimationFrame.Remove(this._Raf);
            this._Raf = null;
        }
        this._Tick = 0;
        this._OnEnd(this);
    }
}
exports.Engine = Engine;
class Engine2D {
    /**
     * @constructor
     * @param {number} from The start value
     * @param {number} to The end value
     * @param {number} length number of frames
     * @param {number} onFrame callback for each frame
     * @param {number} onEnd callback end of the animation
     * @param {number} easing Easing function
     */
    constructor(from, to, length, onFrame, onEnd, easing) {
        /** the current frame number */
        this._Tick = 0;
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
    Cancel() {
        if (this._Raf) {
            AnimationFrame.Remove(this._Raf);
            this._Raf = null;
        }
    }
    /**
     * Starts the animation
     */
    Start() {
        if (!this._Raf)
            this._Raf = AnimationFrame.Add(this._OnAnimationFrame.bind(this));
        AnimationFrame.Start();
    }
    /**
     * Modify the destination - Does not extend the animation time.
     * @param {number} to The end value
     */
    Modify(to) {
        this._To = to;
        this._Length = this._Length - this._Tick;
        this._Tick = 0;
        this._From = this.Current;
    }
    /** requestAnimationFrame callback */
    _OnAnimationFrame() {
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
    _OnAnimationEnd() {
        if (this._Raf) {
            AnimationFrame.Remove(this._Raf);
            this._Raf = null;
        }
        this._Tick = 0;
        this._OnEnd(this);
    }
}
exports.Engine2D = Engine2D;
