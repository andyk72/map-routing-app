import Geolocation, { GeolocationEvents } from '../libs/geolocation/geolocation';

export default () => {
    const geolocator = Geolocation.factory();
    geolocator.subscribe(GeolocationEvents.ON_WATCH_POSITION, (position) => {
        console.log('ON_WATCH_POSITION subscriber', position);
    });
    return geolocator;
}