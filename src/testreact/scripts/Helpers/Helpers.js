"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};
exports.DecodeHTML = (input) => {
    var temp = document.createElement("span");
    temp.innerHTML = input;
    return temp.innerText || temp.textContent;
};
exports.GetCloneHeight = (elt) => {
    var parent = elt.parentElement ? elt.parentElement : document.body, clone = elt.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.display = "block";
    clone.style.visibility = "hidden";
    clone.style.height = "auto";
    clone.style.maxHeight = "none";
    clone.style.top = (window.innerHeight / 2 - clone.clientHeight / 2) + 'px';
    parent.appendChild(clone);
    var height = getComputedStyle(clone).height;
    parent.removeChild(clone);
    return parseFloat(height.replace("px", ""));
};
exports.GetHeight = (elt) => {
    if (elt.parentElement && getComputedStyle(elt).display !== "none" && getComputedStyle(elt).height !== "0px" && getComputedStyle(elt).maxHeight !== "0px")
        return parseFloat(getComputedStyle(elt).height.replace("px", ""));
    else {
        return exports.GetCloneHeight(elt);
    }
};
exports.GetTop = (elt) => {
    var _y = 0;
    while (elt && !isNaN(elt.offsetTop)) {
        _y += elt.offsetTop;
        elt = elt.offsetParent;
    }
    return _y;
};
exports.UpdateQueryString = (key, value, url) => {
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"), hash;
    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
};
exports.GetParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
exports.NormalizeHref = (input) => {
    var re = /(^\/)|(\/$)/gi, protocolindex = input.indexOf("//");
    if (protocolindex >= 0) {
        var componenents = input.substr(input.indexOf("//") + 2).split("/");
        componenents.shift(); // remove domain name
        return "/" + componenents.join("/").replace(re, "");
    }
    return "/" + input.replace(re, "");
};
exports.RemoveFromArray = (arr, elt) => {
    var index = arr.indexOf(elt); // <-- Not supported in <IE9
    if (index !== -1) {
        arr.splice(index, 1);
        return true;
    }
    return false;
};
exports.NodeListToArray = (nl) => {
    return Array.prototype.slice.call(nl);
};
exports.CopyArray = (arr) => {
    return Array.prototype.slice.call(arr);
};
exports.ApplyTransform = (elt, tx, ty) => {
    if (Modernizr.csstransforms3d) {
        _SetStyles(elt, 'transform', 'translate3d(' + tx + ',' + ty + ',0)');
    }
    else if (Modernizr.csstransforms) {
        _SetStyles(elt, 'transform', 'translate(' + tx + ',' + ty + ')');
    }
    else {
        elt.style["left"] = tx;
        elt.style["top"] = ty;
    }
};
exports.ApplyTransform2D = (elt, tx, ty) => {
    if (Modernizr.csstransforms) {
        _SetStyles(elt, 'transform', 'translate(' + tx + ',' + ty + ')');
    }
};
exports.ResponsiveImage = (src, alt, cssClass, dataSize) => {
    var imgElt = document.createElement("img"), noscript = document.createElement("noscript");
    noscript.setAttribute("data-slimmage", "data-slimmage");
    if (dataSize)
        noscript.setAttribute("data-size-class", dataSize);
    noscript.setAttribute("data-img-src", src + "?maxwidth=2200");
    if (dataSize)
        imgElt.setAttribute("data-size-class", dataSize);
    imgElt.setAttribute("src", src);
    noscript.appendChild(imgElt);
    if (cssClass) {
        noscript.setAttribute("data-img-class", cssClass);
        imgElt.classList.add(cssClass);
    }
    if (alt)
        imgElt.setAttribute("alt", alt);
    return noscript;
};
var _SetStyles = (elt, prop, value) => {
    prop = Modernizr.prefixed(prop);
    elt.style[prop] = value;
};
exports.Accelerate = (elt) => {
    _SetStyles(elt, 'transform', 'translate3d(0,0,0)');
    _SetStyles(elt, 'transform-style', 'preserve-3d');
    _SetStyles(elt, 'backface-visibility', 'hidden');
};
exports.ToQryStr = (params) => {
    var str = [];
    for (var p in params)
        if (params.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
        }
    return str.join("&");
};
exports.GetRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.HTMLEncode = (str) => {
    var divElt = document.createElement("div");
    var text = divElt.appendChild(document.createTextNode(str));
    return text.parentElement.innerHTML;
};
exports.HTMLDecode = (str) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
};
exports.GetScrollTopElement = () => {
    if (document.compatMode !== 'CSS1Compat')
        return body;
    var html = document.documentElement;
    var body = document.body;
    var startingY = window.pageYOffset || body.scrollTop || html.scrollTop;
    var newY = startingY + 1;
    if (document.body.clientHeight <= window.innerHeight) {
        document.documentElement.style.height = "100%";
        document.body.style.height = "101%";
    }
    window.scrollTo(0, newY);
    var element = (html.scrollTop === newY) ? html : body;
    window.scrollTo(0, startingY);
    document.documentElement.style.height = null;
    document.body.style.height = null;
    return element;
};
