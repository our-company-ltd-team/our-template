// google API : "//www.google.com/jsapi?ver=3.5.1"
import "//www.google.com/jsapi?ver=3.5.1";

declare var google: any;
const GOOGLE_API_KEY = "AIzaSyBYgWEITQ4X-SAGOZn3F9HwJRURC9ih0qE";

export interface GMap {
    lat: number;
    lng: number;
    onclick?: Function;
    zoom?: number;
    container: Element;
    marker?: { title?: string; icon?: string; shadow?: string };
}
var _Maps: GMap[] = [];
export var Register = (map: GMap) => {
    _Maps.push(map);
};

export var Render = () => {
    //<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10501.277889872059!2d2.372301710015965!3d48.852118110378704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67200e3955e83%3A0xeced3c3b76e646f1!2sBartolo+et+Villemard+Architectes!5e0!3m2!1spt-PT!2spt!4v1417180147812" width="600" height="450" frameborder="0" style="border:0"></iframe>

    if (document.documentElement.classList.contains("lt-ie9"))
        _ImportIframe();
    else
        google.load("maps", "3", { other_params: 'key=' + GOOGLE_API_KEY, callback: _GoogleLoaded });
};

var _ImportIframe = () => {
    var l = _Maps.length;
    while (l--) {
        _RenderIFrame(_Maps[l]);
    }
}

var _GoogleLoaded = () => {
    var l = _Maps.length;
    while (l--) {
        _Render(_Maps[l]);
    }
};
var _IsIphone = () => {
    return ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)));
};
var _Render = (map: GMap) => {
    var latlng = new google.maps.LatLng(map.lat, map.lng),
        zoom_val = map.zoom || 14,
        gm_event = google.maps.event,
        mapOptions: any = {
            zoom: zoom_val,
            center: latlng,
            mapTypeControlOptions: [{ mapTypeIds: [google.maps.MapTypeId.ROADMAP, "grayscale"] }],
            scrollwheel: false,
            backgroundColor: '#ffffff',
            disableDoubleClickZoom: true,
            draggable: _IsIphone,
            mapTypeControl: false
        };

    // Grayscaled map style
    var style: Array<any> = [
        {
            featureType: "all",
            elementType: "all",
            stylers: [
                { saturation: -100 }
            ]
        }
    ];

    var styledMapOptions: any = { name: "Grayscale" },
        grayscaleMapType: any = new google.maps.StyledMapType(style, styledMapOptions),
        gmap = new google.maps.Map(map.container, mapOptions);

    // Add a marker
    var marker_opts:{[key:string]:any} = {
        map: gmap,
        position: latlng,
        animation: google.maps.Animation.DROP
    };

    if (map.marker) {
        if (map.marker.title) marker_opts["title"] = <any>map.marker.title;
        if (map.marker.icon) marker_opts["icon"] = <any>map.marker.icon;
        if (map.marker.shadow) marker_opts["shadow"] = <any>map.marker.shadow;
    }

    var marker = new google.maps.Marker(marker_opts);

    // Add a marker event
    if (map.onclick) {
        gm_event.addListener(marker, 'click', map.onclick);
    }

    // Apply grayscaled map style
    gmap.mapTypes.set('grayscale', <any>grayscaleMapType);
    (<any>gmap).setMapTypeId('grayscale');
}

var _RenderIFrame = (map: GMap) => {
    var zoom_val = map.zoom || 14,
        url = "https://www.google.com/maps/embed/v1/view?center=" + map.lat + "," + map.lng + "&zoom=" + zoom_val + "&maptype=roadmap";
    var iframe = document.createElement("iframe");
    iframe.src = url;
    map.container.appendChild(iframe);
}
var behaviors = document.querySelectorAll("*[data-behavior='gmap']");
var behaviorsLength = behaviors.length;
if (behaviorsLength) {
    while (behaviorsLength--) {
        let behavior = behaviors[behaviorsLength];
        Register({ lat: parseFloat(behavior.getAttribute("data-lat")), zoom: parseInt(behavior.getAttribute("data-zoom")), lng: parseFloat(behavior.getAttribute("data-lng")), container: behavior });
    }
    Render();
}