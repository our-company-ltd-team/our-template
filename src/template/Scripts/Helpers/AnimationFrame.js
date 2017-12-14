define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var _LastId = 1;
    var _OnFrame = [];
    exports.Add = function (cb) {
        var l = _OnFrame.length;
        while (l--) {
            if (_OnFrame[l].cb == cb)
                return _OnFrame[l].id;
        }
        var id = _LastId++;
        _OnFrame.push({ id: id, cb: cb });
        return id;
    };
    exports.Remove = function (id) {
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
    exports.Start = function () {
        if (!exports.Enabled) {
            if (!_OnFrame.length)
                return;
            exports.Enabled = true;
            if (!_Raf) {
                _Raf = requestAnimationFrame(_OnAnimationFrame);
            }
        }
    };
    exports.Stop = function () {
        if (exports.Enabled) {
            exports.Enabled = false;
            if (_Raf) {
                cancelAnimationFrame(_Raf);
                _Raf = null;
            }
        }
    };
    var _Raf;
    exports.Enabled = false;
    var _OnAnimationFrame = function () {
        var l = _OnFrame.length;
        while (l--) {
            if (_OnFrame[l])
                _OnFrame[l].cb.call(window);
        }
        if (exports.Enabled) {
            _Raf = requestAnimationFrame(_OnAnimationFrame);
        }
    };
});
