import * as lazyLoadScript from "lazyload-script"

const react = lazyLoadScript(window.InitReact.src, { crossorigin: true }).catch((err => (
  lazyLoadScript(`./js/vendor/react.15.4.2.min.js`, "react.15.4.2.min.js")
)));

const reactDom = lazyLoadScript(window.InitReact.srcDom, { crossorigin: true }).catch((err => (
  lazyLoadScript(`./js/vendor/react.15.4.2.min.js`, "react.15.4.2.min.js")
)));


const promises = [

];


// var Polyfills = ["Lib/modernizr"];

// var testToggle = () => {
//     var elt = document.createElement("div");
//     elt.classList.toggle("test", false);
//     return !elt.classList.contains("test");
// }

// if (!("classList" in document.documentElement)) {
//     Polyfills.push("Polyfills/classList");
// } else if (!testToggle()) {
//     Polyfills.push("Polyfills/classList.toggle");
// }


// if (!window.addEventListener)
//     Polyfills.push("Polyfills/addEventListener");

// if (!document.getElementsByClassName)
//     Polyfills.push("Polyfills/getElementsByClassName");


// if (!window.matchMedia)
//     Polyfills.push("Polyfills/matchMedia", "Polyfills/matchMedia.addListener");

// if (document.getElementsByTagName("html")[0].className.indexOf("lt-ie9") > -1)
//     Polyfills.push("Polyfills/Array.slice");

// if (!(window.requestAnimationFrame && window.cancelAnimationFrame))
//     Polyfills.push("Polyfills/requestAnimationFrame");


// if (!("startsWith" in String.prototype))
//     Polyfills.push("Polyfills/String.startsWith");

// declare var objectFitImages: any;

// (<any>window).lazyLoadOptions = {};
react.then(() =>
  reactDom.then(() => {
    Promise.all(
      promises
    ).then(() => {
      // find the modules to laod =>
      var required = [].slice.call(document.querySelectorAll("*[data-require]"));
      var filelist = 
        required
          .map(elt => elt.getAttribute("data-require"))
          .filter(src => src)
          .map(src => src.split(','))
          .reduce((a, b) => a.concat(b))
          .map(src => lazyLoadScript(src));
          
      Promise.all(
        filelist
      ).then(() => {
        ga('create', 'GACode', 'auto');
        ga('send', 'pageview');

        // evaluate js ??
        window.InitReact.init();
      });
    });
  })
)