define(["require", "exports", "Helpers/Helpers", "Helpers/Animator", "Helpers/Easing/EaseOutQuart"], function (require, exports, Helpers, Animator, EaseOutQuart) {
    "use strict";
    exports.__esModule = true;
    var _Animator, _ScrollContainer = document.scrollingElement || document.body;
    exports.Scrolling = false;
    var _onFrame = function (val) {
        _ScrollContainer.scrollTop = val;
    };
    var _onEnd = function (top) {
        _onFrame(top);
        document.body.classList.remove("scrolling");
        exports.Scrolling = false;
        _Animator = null;
    };
    exports.To = function (val, animate) {
        if (animate === void 0) { animate = true; }
        exports.Scrolling = true;
        document.body.classList.add("scrolling");
        if (_Animator != null)
            _Animator.Cancel();
        if (!animate) {
            _ScrollContainer.scrollTop = val;
            document.body.classList.remove("scrolling");
            exports.Scrolling = false;
            return;
        }
        _Animator = new Animator.Engine(_ScrollContainer.scrollTop, val, 30, _onFrame, function (a) { return _onEnd(val); }, EaseOutQuart);
        _Animator.Start();
    };
    exports.ToHtmlElt = function (scrollElt, offset, animate) {
        if (offset === void 0) { offset = 0; }
        if (animate === void 0) { animate = true; }
        if (!scrollElt)
            return;
        var top = Helpers.GetTop(scrollElt) - offset;
        exports.To(top, animate);
    };
});
