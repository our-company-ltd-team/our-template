define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var topics = {};
    exports.Subscribe = function (topic, handle) {
        if (!topics[topic])
            topics[topic] = { queue: [] };
        var index = topics[topic].queue.push(handle) - 1;
        return index;
    };
    exports.Remove = function (topic, handle) {
        if (!topics[topic] || !topics[topic].queue.length)
            return false;
        var items = topics[topic].queue, l = items.length;
        while (l--) {
            if (handle == items[l]) {
                items.splice(l, 1);
                return true;
            }
        }
        return false;
    };
    exports.RemoveAll = function (topic) {
        if (!topics[topic])
            return false;
        delete topics[topic];
        return true;
    };
    exports.Publish = function (topic, info) {
        if (!topics[topic] || !topics[topic].queue.length)
            return;
        var items = topics[topic].queue, l = items.length;
        while (l--) {
            items[l](info != null ? info : {});
        }
    };
});
