const L = require('leaflet');

export const geolocationCoordinatesToObject = geolocationCoords => ({
    accuracy: geolocationCoords.accuracy,
    altitude: geolocationCoords.altitude,
    altitudeAccuracy: geolocationCoords.altitudeAccuracy,
    heading: geolocationCoords.heading,
    latitude: geolocationCoords.latitude,
    longitude: geolocationCoords.longitude,
    speed: geolocationCoords.speed
});

export const geolocationCoordinatesToLatLngArray = geolocationCoords => ([
    geolocationCoords.latitude,
    geolocationCoords.longitude
]);

export const geolocationCoordinatesToLatLngObject = geolocationCoords => ({
    lon: geolocationCoords.longitude,
    lat: geolocationCoords.latitude
});

export const geolocationCoordinatesToLatLng = geolocationCoords => (
    L.latLng(geolocationCoords.latitude, geolocationCoords.longitude)
);