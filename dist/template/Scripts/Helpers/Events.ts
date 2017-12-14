var topics: { [topic: number]: { queue: Array<(Object?) => void> } } = {};

export var Subscribe = function (topic: number, handle: (Object?) => void): number {
    // Create the topic's object if not yet created
    if (!topics[topic]) topics[topic] = { queue: [] };

    // Add the listener to queue
    var index = topics[topic].queue.push(handle) - 1;

    // Provide handle back for removal of topic
    return index;
};

export var Remove = function (topic: number, handle: (Object?) => void): boolean {
    if (!topics[topic] || !topics[topic].queue.length) return false;
    var
        items = topics[topic].queue,
        l = items.length;

    while (l--) {
        if (handle == items[l]) {
            items.splice(l, 1);
            return true;
        }
    }
    return false;
};

export var RemoveAll = function (topic: number) {
    if (!topics[topic]) return false;
    delete topics[topic];
    return true;
};

export var Publish = function (topic: number, info?: any) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!topics[topic] || !topics[topic].queue.length) return;

    // Cycle through topics queue, fire!
    var
        items = topics[topic].queue,
        l = items.length;

    while (l--) {
        items[l](info != null ? info : {});
    }
};