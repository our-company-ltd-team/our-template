import * as Helpers from "./Helpers";
import * as Animator from "./Animator";
import * as EaseOutQuart from "./Easing/EaseOutQuart";

var
    _Animator: Animator.Engine,
    _ScrollContainer = document.scrollingElement || document.body;

export var Scrolling = false;

var _onFrame = (val: number) => {
    _ScrollContainer.scrollTop = val;
}

var _onEnd = (top: number) => {
    _onFrame(top);
    document.body.classList.remove("scrolling")
    Scrolling = false;
    _Animator = null;
}

export var To = (val: number, animate: boolean = true) => {
    Scrolling = true;
    document.body.classList.add("scrolling");
    if (_Animator != null)
        _Animator.Cancel();

    if (!animate) {
        _ScrollContainer.scrollTop = val;
        //void _ScrollContainer.offsetWidth;
        document.body.classList.remove("scrolling")
        Scrolling = false;
        return;
    }
    _Animator = new Animator.Engine(_ScrollContainer.scrollTop, val, 30, _onFrame, (a: Animator.Engine) => _onEnd(val), EaseOutQuart.default);
    _Animator.Start();
}

export var ToHtmlElt = (scrollElt: HTMLElement, offset = 0, animate: boolean = true) => {
    if (!scrollElt)
        return;
    var top = Helpers.GetTop(scrollElt) - offset;
    To(top, animate);
}