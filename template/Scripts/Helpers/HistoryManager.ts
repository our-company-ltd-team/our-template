import Helpers = require("Helpers/Helpers");
import Events = require("Helpers/Events");
export var Title: string = document.title;
export var Href: string = Helpers.NormalizeHref(((<any>window.history).location || document.location).href);

export var ChangeState = (url: string, title: string, state?: any) => {
    var href = Helpers.NormalizeHref(url);

    if (Href == href)
        return; // we are there already;

    Href = href;

    document.title = Helpers.DecodeHTML(title);

    if (window["ga"])
        window["ga"](function (tracker) {
            tracker.send('pageview',
                {
                    'page': href,
                    'title': title
                });
        });

    history.pushState(state, null, href);
}

export var OnPopState = (e: PopStateEvent) => {
    var
        url = ((<any>window.history).location || document.location).href,
        href = Helpers.NormalizeHref(url);

    if (Href != href) {
        Href = href;
        Events.Publish($Events.Navigate, href);
        Events.Publish($Events.PopState, e);
        
    }
}

window.addEventListener("popstate", OnPopState);