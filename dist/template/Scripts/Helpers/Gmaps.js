define(["require", "exports", "//www.google.com/jsapi?ver=3.5.1"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var GOOGLE_API_KEY = "AIzaSyBYgWEITQ4X-SAGOZn3F9HwJRURC9ih0qE";
    var _Maps = [];
    exports.Register = function (map) {
        _Maps.push(map);
    };
    exports.Render = function () {
        if (document.documentElement.classList.contains("lt-ie9"))
            _ImportIframe();
        else
            google.load("maps", "3", { other_params: 'key=' + GOOGLE_API_KEY, callback: _GoogleLoaded });
    };
    var _ImportIframe = function () {
        var l = _Maps.length;
        while (l--) {
            _RenderIFrame(_Maps[l]);
        }
    };
    var _GoogleLoaded = function () {
        var l = _Maps.length;
        while (l--) {
            _Render(_Maps[l]);
        }
    };
    var _IsIphone = function () {
        return ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)));
    };
    var _Render = function (map) {
        var latlng = new google.maps.LatLng(map.lat, map.lng), zoom_val = map.zoom || 14, gm_event = google.maps.event, mapOptions = {
            zoom: zoom_val,
            center: latlng,
            mapTypeControlOptions: [{ mapTypeIds: [google.maps.MapTypeId.ROADMAP, "grayscale"] }],
            scrollwheel: false,
            backgroundColor: '#ffffff',
            disableDoubleClickZoom: true,
            draggable: _IsIphone,
            mapTypeControl: false
        };
        var style = [
            {
                featureType: "all",
                elementType: "all",
                stylers: [
                    { saturation: -100 }
                ]
            }
        ];
        var styledMapOptions = { name: "Grayscale" }, grayscaleMapType = new google.maps.StyledMapType(style, styledMapOptions), gmap = new google.maps.Map(map.container, mapOptions);
        var marker_opts = {
            map: gmap,
            position: latlng,
            animation: google.maps.Animation.DROP
        };
        if (map.marker) {
            if (map.marker.title)
                marker_opts["title"] = map.marker.title;
            if (map.marker.icon)
                marker_opts["icon"] = map.marker.icon;
            if (map.marker.shadow)
                marker_opts["shadow"] = map.marker.shadow;
        }
        var marker = new google.maps.Marker(marker_opts);
        if (map.onclick) {
            gm_event.addListener(marker, 'click', map.onclick);
        }
        gmap.mapTypes.set('grayscale', grayscaleMapType);
        gmap.setMapTypeId('grayscale');
    };
    var _RenderIFrame = function (map) {
        var zoom_val = map.zoom || 14, url = "https://www.google.com/maps/embed/v1/view?center=" + map.lat + "," + map.lng + "&zoom=" + zoom_val + "&maptype=roadmap";
        var iframe = document.createElement("iframe");
        iframe.src = url;
        map.container.appendChild(iframe);
    };
    var behaviors = document.querySelectorAll("*[data-behavior='gmap']");
    var behaviorsLength = behaviors.length;
    if (behaviorsLength) {
        while (behaviorsLength--) {
            var behavior = behaviors[behaviorsLength];
            exports.Register({ lat: parseFloat(behavior.getAttribute("data-lat")), zoom: parseInt(behavior.getAttribute("data-zoom")), lng: parseFloat(behavior.getAttribute("data-lng")), container: behavior });
        }
        exports.Render();
    }
});
