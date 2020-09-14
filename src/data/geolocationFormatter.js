export const geolocationCoordinatesToObject = geolocationCoords => ({
    accuracy: geolocationCoords.accuracy,
    altitude: geolocationCoords.altitude,
    altitudeAccuracy: geolocationCoords.altitudeAccuracy,
    heading: geolocationCoords.heading,
    latitude: geolocationCoords.latitude,
    longitude: geolocationCoords.longitude,
    speed: geolocationCoords.speed
});