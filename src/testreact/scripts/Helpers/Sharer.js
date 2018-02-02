"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facebook = () => {
    var leftPosition, topPosition, width = 400, height = 300;
    //Allow for borders.
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no", u = location.href, t = document.title;
    window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', windowFeatures);
};
exports.Twitter = () => {
    var leftPosition, topPosition, width = 400, height = 300;
    //Allow for borders.
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no", u = location.href, t = document.title;
    window.open('https://twitter.com/share?url=' + encodeURIComponent(u) + '&text=' + encodeURIComponent(t), 'sharer', windowFeatures);
};
exports.Google = () => {
    var leftPosition, topPosition, width = 400, height = 300;
    //Allow for borders.
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no", u = location.href, t = document.title;
    window.open('https://plus.google.com/share?url=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', windowFeatures);
};
exports.Tumblr = () => {
    var leftPosition, topPosition, width = 400, height = 300;
    //Allow for borders.
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no", u = location.href, t = document.title;
    window.open('http://www.tumblr.com/share/link?url=' + encodeURIComponent(u) + '&name=' + encodeURIComponent(t), 'sharer', windowFeatures);
};
exports.Mail = () => {
    window.location.href = "mailto:?body=" + location.href;
};
