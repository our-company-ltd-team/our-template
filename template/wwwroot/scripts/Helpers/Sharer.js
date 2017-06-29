define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Facebook = function () {
        var leftPosition, topPosition, width = 400, height = 300;
        leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
        topPosition = (window.screen.height / 2) - ((height / 2) + 50);
        var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no", u = location.href, t = document.title;
        window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', windowFeatures);
        return void (0);
    };
    exports.Twitter = function () {
        var leftPosition, topPosition, width = 400, height = 300;
        leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
        topPosition = (window.screen.height / 2) - ((height / 2) + 50);
        var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no", u = location.href, t = document.title;
        window.open('https://twitter.com/share?url=' + encodeURIComponent(u) + '&text=' + encodeURIComponent(t), 'sharer', windowFeatures);
        return void (0);
    };
    exports.Google = function () {
        var leftPosition, topPosition, width = 400, height = 300;
        leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
        topPosition = (window.screen.height / 2) - ((height / 2) + 50);
        var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no", u = location.href, t = document.title;
        window.open('https://plus.google.com/share?url=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', windowFeatures);
        return void (0);
    };
    exports.Tumblr = function () {
        var leftPosition, topPosition, width = 400, height = 300;
        leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
        topPosition = (window.screen.height / 2) - ((height / 2) + 50);
        var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no", u = location.href, t = document.title;
        window.open('http://www.tumblr.com/share/link?url=' + encodeURIComponent(u) + '&name=' + encodeURIComponent(t), 'sharer', windowFeatures);
        return void (0);
    };
    exports.Mail = function () {
        window.location.href = "mailto:?body=" + location.href;
    };
});
