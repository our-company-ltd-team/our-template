
var Polyfills = ["Lib/modernizr"];

var testToggle = () => {
    var elt = document.createElement("div");
    elt.classList.toggle("test", false);
    return !elt.classList.contains("test");
}

if (!("classList" in document.documentElement)) {
    Polyfills.push("Polyfills/classList");
} else if (!testToggle()) {
    Polyfills.push("Polyfills/classList.toggle");
}


if (!window.addEventListener)
    Polyfills.push("Polyfills/addEventListener");

if (!document.getElementsByClassName)
    Polyfills.push("Polyfills/getElementsByClassName");


if (!window.matchMedia)
    Polyfills.push("Polyfills/matchMedia", "Polyfills/matchMedia.addListener");

if (document.getElementsByTagName("html")[0].className.indexOf("lt-ie9") > -1)
    Polyfills.push("Polyfills/Array.slice");

if (!(window.requestAnimationFrame && window.cancelAnimationFrame))
    Polyfills.push("Polyfills/requestAnimationFrame");


if (!("startsWith" in String.prototype))
    Polyfills.push("Polyfills/String.startsWith");

declare var objectFitImages: any;

(<any>window).lazyLoadOptions = {};

requirejs(Polyfills, () => {
    if (!Modernizr.objectfit) {
        requirejs(["Polyfills/object-fit-images", "Polyfills/object-fit-videos"], () => {
            objectFitImages();
        });
    }
    var required: string[] = [];
    var requiredElements = document.querySelectorAll("*[data-require]");

    for (var i = 0; i < requiredElements.length; i++) {
        var requireAtt = requiredElements[i].getAttribute("data-require");
        if (!requireAtt) continue;
        var EltRequries = requiredElements[i].getAttribute("data-require").split(",");
        for (var j = 0; j < EltRequries.length; j++) {
            if (required.indexOf(EltRequries[j]) >= 0) continue;
            required.push(EltRequries[j]);
        }
    }

    if (!required || !required.length)
        return;

    requirejs(required, () => { });
});
