define(["require", "exports"], function (require, exports) {
    "use strict";
    var Diaporama = (function () {
        function Diaporama(slides, options) {
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
            var _loop_1 = function () {
                var slide = slides[l];
                slide.addEventListener("transitionend", function (e) {
                    if (slide.style.opacity == "0")
                        slide.style.display = "none";
                });
            };
            while (l--) {
                _loop_1();
            }
            if (options.autostart)
                this.Play();
            else if (this.Current < 0) {
                this.Current = -1;
                this._Next();
            }
        }
        Diaporama.prototype.Play = function () {
            this._Playing = true;
            this._Next();
        };
        Diaporama.prototype.Pause = function () {
            this._Playing = false;
        };
        Diaporama.prototype.Go = function (slideNum) {
            this.Pause();
            this._Go(slideNum);
        };
        Diaporama.prototype.Next = function () {
            this.Pause();
            this._Next();
        };
        Diaporama.prototype.Previous = function () {
            this.Pause();
            this._Previous();
        };
        Diaporama.prototype._Go = function (slideNum) {
            var _this = this;
            if (this.Current == slideNum)
                return;
            var newElt = this._Slides[slideNum];
            if (newElt.style.display == "none") {
                newElt.style.opacity = "0";
            }
            newElt.style.display = "block";
            newElt.style.zIndex = "1";
            setTimeout(function () {
                newElt.style.opacity = _this._Opacity.toString();
            }, 1);
            this._OnSlideShow(slideNum, newElt);
            if (this.Current >= 0) {
                var oldElt = this._Slides[this.Current];
                this._OnSlideHide(this.Current, oldElt);
                oldElt.style.zIndex = "0";
                setTimeout(function () {
                    oldElt.style.opacity = "0";
                }, 1);
            }
            this.Current = slideNum;
        };
        Diaporama.prototype._OnSlideShow = function (index, slide) {
            if (this._Playing && this._Slides.length > 1) {
                clearTimeout(this._PlayingInte);
                this._PlayingInte = setTimeout(this._Next.bind(this), this._Delay);
            }
            if (this._On && this._On.show) {
                this._On.show(index, slide);
            }
        };
        Diaporama.prototype._OnSlideHide = function (index, slide) {
            if (this._On && this._On.hide) {
                this._On.hide(index, slide);
            }
        };
        Diaporama.prototype._Next = function () {
            if (!this._Loop && this.Current >= (this._Slides.length - 1))
                return;
            this._Go((this.Current + 1) % this._Slides.length);
        };
        Diaporama.prototype._Previous = function () {
            if (!this._Loop && this.Current <= 0)
                return;
            this._Go((this.Current - 1 + this._Slides.length) % this._Slides.length);
        };
        Diaporama.prototype.Destroy = function () {
            if (this._PlayingInte)
                clearTimeout(this._PlayingInte);
        };
        return Diaporama;
    }());
    return Diaporama;
});
