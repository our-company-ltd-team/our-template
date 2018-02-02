"use strict";
/**
 * Static helper class to handler callbacks on animation frames
 *
 *
 * @class       AnimationFrame
 * @author      Our Company Ltd.
 * @description Creates a single object to handle all the callbacks needed
 *              on animation frames. Stop requesting animation frames as
 *              soon as there are no more callbacks. A static class is basicaly a
 *              typescript module.
 * @version      0.1
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** The last id returned. */
var _LastId = 1;
/** Array of the callbacks on animation frame. */
var _OnFrame = [];
/**
 * Adds a callback to the animation frame list
 * @param {function} cb The callback to add
 * @returns {number} the numerical ID of the AnimationFrame object - can be used later with Remove()
 */
exports.Add = (cb) => {
    var l = _OnFrame.length;
    while (l--) {
        if (_OnFrame[l].cb == cb)
            return _OnFrame[l].id;
    }
    var id = _LastId++;
    _OnFrame.push({ id: id, cb: cb });
    return id;
};
/**
 * Removes a callback from the animation frame list
 * @param {number} the numerical ID of the AnimationFrame object - returned by Add()
 */
exports.Remove = (id) => {
    var l = _OnFrame.length;
    while (l--) {
        if (_OnFrame[l].id == id) {
            _OnFrame.splice(l, 1);
            break;
        }
    }
    if (!_OnFrame.length)
        exports.Stop();
};
/**
 * Starts requesting animation frames
 */
exports.Start = () => {
    if (!exports.Enabled) {
        if (!_OnFrame.length)
            return;
        exports.Enabled = true;
        if (!_Raf) {
            _Raf = requestAnimationFrame(_OnAnimationFrame);
        }
    }
};
/**
 * Stop requesting animation frames
 */
exports.Stop = () => {
    if (exports.Enabled) {
        exports.Enabled = false;
        if (_Raf) {
            cancelAnimationFrame(_Raf);
            _Raf = null;
        }
    }
};
/** Current requestAnimationFrame numerical ID */
var _Raf;
/** Current state */
exports.Enabled = false;
/** requestAnimationFrame callback */
var _OnAnimationFrame = () => {
    // apply all callbacks
    var l = _OnFrame.length;
    while (l--) {
        if (_OnFrame[l])
            _OnFrame[l].cb.call(window);
    }
    if (exports.Enabled) {
        // requests the next frame
        _Raf = requestAnimationFrame(_OnAnimationFrame);
    }
};
