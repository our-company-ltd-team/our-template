"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers = require("./Helpers");
const Animator = require("./Animator");
const EaseOutQuart = require("./Easing/EaseOutQuart");
var _Animator, _ScrollContainer = document.scrollingElement || document.body;
exports.Scrolling = false;
var _onFrame = (val) => {
    _ScrollContainer.scrollTop = val;
};
var _onEnd = (top) => {
    _onFrame(top);
    document.body.classList.remove("scrolling");
    exports.Scrolling = false;
    _Animator = null;
};
exports.To = (val, animate = true) => {
    exports.Scrolling = true;
    document.body.classList.add("scrolling");
    if (_Animator != null)
        _Animator.Cancel();
    if (!animate) {
        _ScrollContainer.scrollTop = val;
        //void _ScrollContainer.offsetWidth;
        document.body.classList.remove("scrolling");
        exports.Scrolling = false;
        return;
    }
    _Animator = new Animator.Engine(_ScrollContainer.scrollTop, val, 30, _onFrame, (a) => _onEnd(val), EaseOutQuart.default);
    _Animator.Start();
};
exports.ToHtmlElt = (scrollElt, offset = 0, animate = true) => {
    if (!scrollElt)
        return;
    var top = Helpers.GetTop(scrollElt) - offset;
    exports.To(top, animate);
};
