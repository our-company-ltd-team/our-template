define(["require", "exports", "Helpers/Helpers", "Helpers/Events"], function (require, exports, Helpers, Events) {
    "use strict";
    exports.__esModule = true;
    exports.Title = document.title;
    exports.Href = Helpers.NormalizeHref((window.history.location || document.location).href);
    exports.ChangeState = function (url, title, state) {
        var href = Helpers.NormalizeHref(url);
        if (exports.Href == href)
            return;
        exports.Href = href;
        document.title = Helpers.DecodeHTML(title);
        if (window["ga"])
            window["ga"](function (tracker) {
                tracker.send('pageview', {
                    'page': href,
                    'title': title
                });
            });
        history.pushState(state, null, href);
    };
    exports.OnPopState = function (e) {
        var url = (window.history.location || document.location).href, href = Helpers.NormalizeHref(url);
        if (exports.Href != href) {
            exports.Href = href;
            Events.Publish(1, href);
            Events.Publish(5, e);
        }
    };
    window.addEventListener("popstate", exports.OnPopState);
});
