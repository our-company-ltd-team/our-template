export var guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export var DecodeHTML = (input: string): string => {
    var temp = document.createElement("span");
    temp.innerHTML = input;
    return temp.innerText || temp.textContent;
}

export var GetCloneHeight = (elt: HTMLElement): number => {
    var
        parent = elt.parentElement ? elt.parentElement : document.body,
        clone = <HTMLElement>elt.cloneNode(true);

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
}

export var GetHeight = (elt: HTMLElement): number => {
    if (elt.parentElement && getComputedStyle(elt).display !== "none" && getComputedStyle(elt).height !== "0px" && getComputedStyle(elt).maxHeight !== "0px")
        return parseFloat(getComputedStyle(elt).height.replace("px", ""));
    else {
        return GetCloneHeight(elt);
    }
}

export var GetTop = (elt): number => {
    var _y = 0;
    while (elt && !isNaN(elt.offsetTop)) {
        _y += elt.offsetTop;
        elt = elt.offsetParent;
    }
    return _y;
}

export var UpdateQueryString = (key: string, value: string, url: string) => {
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash: string[];

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
}

export var GetParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export var NormalizeHref = (input: string): string => {
    var
        re = /(^\/)|(\/$)/gi,
        protocolindex = input.indexOf("//");

    if (protocolindex >= 0) {
        var componenents = input.substr(input.indexOf("//") + 2).split("/");
        componenents.shift(); // remove domain name
        return "/" + componenents.join("/").replace(re, "");
    }

    return "/" + input.replace(re, "");
}

export var RemoveFromArray = (arr: Object[], elt: Object) => {
    var index = arr.indexOf(elt);    // <-- Not supported in <IE9
    if (index !== -1) {
        arr.splice(index, 1);
        return true;
    }
    return false;
}

export var NodeListToArray = (nl: NodeList): Object[] => {
    return Array.prototype.slice.call(nl);
}

export var CopyArray = (arr: Object[]): Object[] => {
    return Array.prototype.slice.call(arr);
}
export var ApplyTransform = (elt: HTMLElement, tx: string, ty: string) => {
    if (Modernizr.csstransforms3d) {
        _SetStyles(elt, 'transform', 'translate3d(' + tx + ',' + ty + ',0)');
    } else if (Modernizr.csstransforms) {
        _SetStyles(elt, 'transform', 'translate(' + tx + ',' + ty + ')');
    } else {
        elt.style["left"] = tx;
        elt.style["top"] = ty;
    }
}

export var ApplyTransform2D = (elt: HTMLElement, tx: string, ty: string) => {
    if (Modernizr.csstransforms) {
        _SetStyles(elt, 'transform', 'translate(' + tx + ',' + ty + ')');
    }
}

export var ResponsiveImage = (src: string, alt?: string, cssClass?: string, dataSize?: string): HTMLElement => {
    var
        imgElt: HTMLElement = document.createElement("img"),
        noscript: HTMLElement = document.createElement("noscript");

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
}

var _SetStyles = (elt: HTMLElement, prop: string, value: string) => {
    prop = Modernizr.prefixed(prop);
    elt.style[prop] = value;
}

export var Accelerate = (elt: HTMLElement) => {
    _SetStyles(elt, 'transform', 'translate3d(0,0,0)');
    _SetStyles(elt, 'transform-style', 'preserve-3d');
    _SetStyles(elt, 'backface-visibility', 'hidden');
}

export var ToQryStr = (params: Object) => {
    var str = [];
    for (var p in params)
        if (params.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
        }
    return str.join("&");
}

export var GetRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export var HTMLEncode = (str: string): string => {
    var divElt = document.createElement("div");
    var text = divElt.appendChild(document.createTextNode(str));
    return text.parentElement.innerHTML;
}

export var HTMLDecode = (str: string): string => {
    var txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

export var GetScrollTopElement = () => {

    if (document.compatMode !== 'CSS1Compat') return body;

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
}