define(["require", "exports", "Helpers/AnimationFrame"], function (require, exports, AnimationFrame) {
    "use strict";
    exports.__esModule = true;
    var Engine = (function () {
        function Engine(from, to, length, onFrame, onEnd, easing) {
            this._Tick = 0;
            this._Easing = easing;
            this._OnEnd = onEnd;
            this._OnFrame = onFrame;
            this._Length = length;
            this._To = to;
            this._From = from;
            this.Current = from;
        }
        Engine.prototype.Cancel = function () {
            if (this._Raf) {
                AnimationFrame.Remove(this._Raf);
                this._Raf = null;
            }
        };
        Engine.prototype.Start = function () {
            if (!this._Raf)
                this._Raf = AnimationFrame.Add(this._OnAnimationFrame.bind(this));
            AnimationFrame.Start();
        };
        Engine.prototype.Modify = function (to) {
            this._To = to;
            this._Length = this._Length - this._Tick;
            this._Tick = 0;
            this._From = this.Current;
        };
        Engine.prototype._OnAnimationFrame = function () {
            this.Current = this._Easing(this._Tick, this._From, this._To - this._From, this._Length);
            this._OnFrame(this.Current);
            this._Tick++;
            if (this._Tick >= this._Length) {
                this._OnAnimationEnd();
            }
        };
        Engine.prototype._OnAnimationEnd = function () {
            if (this._Raf) {
                AnimationFrame.Remove(this._Raf);
                this._Raf = null;
            }
            this._Tick = 0;
            this._OnEnd(this);
        };
        return Engine;
    }());
    exports.Engine = Engine;
    var Engine2D = (function () {
        function Engine2D(from, to, length, onFrame, onEnd, easing) {
            this._Tick = 0;
            this._Easing = easing;
            this._OnEnd = onEnd;
            this._OnFrame = onFrame;
            this._Length = length;
            this._To = to;
            this._From = from;
            this.Current = from;
        }
        Engine2D.prototype.Cancel = function () {
            if (this._Raf) {
                AnimationFrame.Remove(this._Raf);
                this._Raf = null;
            }
        };
        Engine2D.prototype.Start = function () {
            if (!this._Raf)
                this._Raf = AnimationFrame.Add(this._OnAnimationFrame.bind(this));
            AnimationFrame.Start();
        };
        Engine2D.prototype.Modify = function (to) {
            this._To = to;
            this._Length = this._Length - this._Tick;
            this._Tick = 0;
            this._From = this.Current;
        };
        Engine2D.prototype._OnAnimationFrame = function () {
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
        };
        Engine2D.prototype._OnAnimationEnd = function () {
            if (this._Raf) {
                AnimationFrame.Remove(this._Raf);
                this._Raf = null;
            }
            this._Tick = 0;
            this._OnEnd(this);
        };
        return Engine2D;
    }());
    exports.Engine2D = Engine2D;
});
