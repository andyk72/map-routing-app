import L from 'leaflet';
import markerIcon from './assets/images/marker-icon.png';
import markerIconShadow from './assets/images/marker-shadow.png';

let DefaultMarkerIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
    iconSize: [25,41],      // necessary to have the icon keep its position while zooming
    iconAnchor: [12.5,41]   // necessary to have the icon keep its position while zooming
});
//L.Marker.prototype.options.icon = DefaultMarkerIcon;

export {
    DefaultMarkerIcon
}