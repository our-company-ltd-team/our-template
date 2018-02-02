"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Diaporama {
    constructor(slides, options) {
        this.Current = -1;
        this._Loop = true;
        if (!slides.length)
            return;
        this._Slides = slides;
        this._Opacity = options.opacity || 1;
        this._Delay = options.delay || 6000;
        this._Loop = options.loop == undefined ? options.loop : true;
        this._On = options.on;
        var l = slides.length;
        while (l--) {
            let slide = slides[l];
            slide.addEventListener("transitionend", (e) => {
                if (slide.style.opacity == "0")
                    slide.style.display = "none";
            });
        }
        if (options.autostart)
            this.Play();
        else if (this.Current < 0) {
            this.Current = -1;
            this._Next();
        }
    }
    Play() {
        this._Playing = true;
        // add interval if not animating nor already existing.
        this._Next();
    }
    Pause() {
        this._Playing = false;
        // remove interval already existing.
    }
    Go(slideNum) {
        this.Pause();
        this._Go(slideNum);
    }
    Next() {
        this.Pause();
        this._Next();
    }
    Previous() {
        this.Pause();
        this._Previous();
    }
    _Go(slideNum) {
        if (this.Current == slideNum)
            return;
        var newElt = this._Slides[slideNum];
        if (newElt.style.display == "none") {
            newElt.style.opacity = "0";
        }
        newElt.style.display = "block";
        newElt.style.zIndex = "1";
        setTimeout(() => {
            newElt.style.opacity = this._Opacity.toString();
        }, 1);
        this._OnSlideShow(slideNum, newElt);
        if (this.Current >= 0) {
            var oldElt = this._Slides[this.Current];
            this._OnSlideHide(this.Current, oldElt);
            oldElt.style.zIndex = "0";
            setTimeout(() => {
                oldElt.style.opacity = "0";
            }, 1);
        }
        this.Current = slideNum;
    }
    _OnSlideShow(index, slide) {
        if (this._Playing && this._Slides.length > 1) {
            clearTimeout(this._PlayingInte);
            this._PlayingInte = setTimeout(this._Next.bind(this), this._Delay);
        }
        if (this._On && this._On.show) {
            this._On.show(index, slide);
        }
    }
    _OnSlideHide(index, slide) {
        if (this._On && this._On.hide) {
            this._On.hide(index, slide);
        }
    }
    _Next() {
        if (!this._Loop && this.Current >= (this._Slides.length - 1))
            return;
        this._Go((this.Current + 1) % this._Slides.length);
    }
    _Previous() {
        if (!this._Loop && this.Current <= 0)
            return;
        this._Go((this.Current - 1 + this._Slides.length) % this._Slides.length);
    }
    Destroy() {
        if (this._PlayingInte)
            clearTimeout(this._PlayingInte);
    }
}
exports.default = Diaporama;
