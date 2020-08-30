const L = require('leaflet');
require('leaflet-routing-machine');

const DEFAULT_CONFIG = {
    mapboxToken: 'pk.eyJ1IjoiYW5kcmVhLXBhZG92YW5pIiwiYSI6ImNrZWg1bHh6YjBwM2kyd2xwcGJsNjQwcHUifQ.H1C2bQP2xRbWD_UZB-sACQ',
    mapId: 'map',
    startCenter: [45.4628327, 9.1075209],
    startZoom: 13
};

class LeafletMap {

    constructor(options = {}) {
        this.configSet(options);
        console.log(this.config);
        this.map = null;
        this.routing = null;
    }

    configSet(options) {
        const config = options
            ? {...DEFAULT_CONFIG, ...options}
            : DEFAULT_CONFIG;
        this.config = config;
    }

    /**
    configSet(options) {
        const config = options.config
            ? {...DEFAULT_CONFIG, ...options.config}
            : DEFAULT_CONFIG;
        this.config = config;
    }
     */

    render() {

        // init map
        this.map = L
            .map('map')
            .setView(this.config.startCenter, this.config.startZoom);

        // mapbox
        L
            .tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ this.config.mapboxToken }`, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v11',
                maxZoom: 18,
                tileSize: 512,
                zoomOffset: -1,
            })
            .addTo(this.map);

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