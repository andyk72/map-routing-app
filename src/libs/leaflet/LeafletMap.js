import { DefaultMarkerIcon } from './leaflet-icons';
const L = require('leaflet');
require('leaflet-routing-machine');

const DEFAULT_CONFIG = {
    mapboxToken: 'pk.eyJ1IjoiYW5kcmVhLXBhZG92YW5pIiwiYSI6ImNrZWg1bHh6YjBwM2kyd2xwcGJsNjQwcHUifQ.H1C2bQP2xRbWD_UZB-sACQ',
    mapId: 'map',
    startCenter: [45.4628327, 9.1075209],
    startZoom: 13,
    maxZoom: 18,
    whereAmIMarkerEnabled: true,
    markerPopupEnabled: false,
    popupContentFn: (markerData) => {
        const coords = markerData.coords;
        return coords[0] + ', ' + coords[1];
    }
};

const DEFAULT_MARKER_OPTIONS = {
    icon: DefaultMarkerIcon
};

class LeafletMap {

    constructor(options = {}) {
        this.configSet(options);
        console.log(this.config);
        this.map = null;
        this.markersLayer = null;
        this.whereAmIMarker = null;
        this.routing = null;
    }

    configSet(options) {
        const config = options
            ? {...DEFAULT_CONFIG, ...options}
            : DEFAULT_CONFIG;
        this.config = config;
    }

    render(options = {}) {

        // init map
        this.map = L
            .map('map')
            .setView(
                options.startCenter || this.config.startCenter,
                options.startZoom || this.config.startZoom
            );

        // mapbox
        L
            .tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ this.config.mapboxToken }`, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v11',
                maxZoom: this.config.maxZoom,
                tileSize: 512,
                zoomOffset: -1,
            })
            .addTo(this.map);

        // markers layer
        this.markersLayer = L.layerGroup().addTo(this.map);

        if (this.config.whereAmIMarkerEnabled) {
            this.whereAmIMarker = this.markerAdd({
                coords: this.config.startCenter
            });
        }

    }

    /**
     * Moves map center to coords
     * Move marker to coords
     * @param {L.LatLng} coords 
     */
    updateCenter(coords) {
        this.map.setView(coords);
        if (this.whereAmIMarker) {
            this.whereAmIMarker.setLatLng(coords);
        }
    }

    /**
     * Adds a marker to the map
     * The marker is added to this.markersLayer
     * @param {Object} markerData
     *  Format
     *      .coords {Array|Object|L.latLng}
     *      .markerOptions {Object|undefined} optional
     *  Sample
     *      .name: 'Milano',
     *      .coords: [45.4773, 9.1815],
     *      .power_generated: 3176.43,
     *      .weather: "sun"
     * @param {Function} popupContentFn optional
     * @returns {L.Marker}
     */
    markerAdd(markerData, popupContentFn) {
        const markerOptions = markerData.markerOptions || DEFAULT_MARKER_OPTIONS;
        const marker = L.marker(markerData.coords, markerOptions).addTo(this.markersLayer);
        if (this.config.markerPopupEnabled) {
            popupContentFn = popupContentFn || this.config.popupContentFn;
            const popup = marker.bindPopup(popupContentFn(markerData));
        }
        return marker;
    }

    /**
     * Renders the route defined by waypoints
     * @param {Array[Float[]]} waypoints 
     *  [
            [57.74, 11.94],
            [57.6792, 11.949]
        ]
     */
    renderRoute(waypoints) {
        this.routing = L.Routing.control({
            waypoints: LeafletMap.pointsToLatLng(waypoints),
            routeWhileDragging: true,
            router: L.Routing.mapbox(this.config.mapboxToken)
        });
        this.routing.addTo(this.map);
    }

    /**
     * Appends point to the current route
     * @param {Float[]} point 
     * @usage
     *  map.routeAppendPoint([57.300, 11.949]);
     */
    routeAppendPoint(point) {
        console.log('Appending point ', point);
        this.routing.spliceWaypoints(
            this.routing.getWaypoints().length,
            0,
            LeafletMap.pointToLatLng(point)
        );
    }

    /**
     * Transforms and returns an Array of points into an Array of L.latLng objects
     * @param {Array[Float[]]} points 
     *  [
     *      [57.74, 11.94],
     *      [57.6792, 11.949]
     *  ]
     * @returns {L.latLng[]}
     *  [
     *      {lat: 57.74, lng: 11.94},
     *      {lat: 57.6792, lng: 11.949}
     *  ]
     */
    static pointsToLatLng(points) {
        return points.map(point => LeafletMap.pointToLatLng(point));
    }

    /**
     * Transforms and returns a points into a L.latLng objects
     * @param {Float[]} point 
     *  [57.74, 11.94]
     * @returns {L.latLng}
     *  {lat: 57.74, lng: 11.94}
     */
    static pointToLatLng(point) {
        return L.latLng(point[0], point[1]);
    }

}

export default LeafletMap;