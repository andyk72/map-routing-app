export const GeolocationEvents = {
    ON_GET_CURRENT_POSITION: 'ON_GET_CURRENT_POSITION',
    ON_WATCH_POSITION: 'ON_WATCH_POSITION'
};

class Geolocation {

    static factory() {
        if ("geolocation" in navigator) {
            /* la geolocalizzazione è disponibile */
            console.log('Geolocation!');
            return new Geolocation();
        } else {
            /* la geolocalizzazione NON È disponibile */
            console.error('Geolocation is not available');
            throw Error('Geolocation is not available');
        }
    }

    constructor() {
        this.subscriptions = {};
        this.positionWatcher = null;
        this.currentPosition = null;
        this.positionsHistory = [];
        this.listen();
    }

    subscribe(event, callback) {
        if (!this.subscriptions[event]) {
            this.subscriptions[event] = [];
        }
        this.subscriptions[event].push(callback);
    }

    dispatch(event, params = {}) {
        if (!this.subscriptions[event]) {
            return;
        }
        this.subscriptions[event].forEach(callback => callback(params));
    }

    _updatePosition(position) {
        this.currentPosition = position;
        this.positionsHistory.push(position);
    }

    _resetPosition() {
        this.currentPosition = null;
        this.positionsHistory = [];
    }

    listen() {

        const geoSuccess = position => {
            this._updatePosition(position);
            this.dispatch(GeolocationEvents.ON_WATCH_POSITION, position);
        };
        const geoError = () => {};
        const geoOptions = {
            enableHighAccuracy: true, 
            maximumAge        : 30000, 
            timeout           : 27000
        };

        /**
         * @param {Object} position
         *  .coords
         *      .latitude
         *      .longitude
         */
        this.positionWatcher = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
        
    }

    getPosition(callback) {
        /**
         * @param {Object} position
         *  .coords
         *      .latitude
         *      .longitude
         */
        navigator.geolocation.getCurrentPosition(position => {
            console.log('Got position ', position);
            this._updatePosition(position);
            this.dispatch(GeolocationEvents.ON_GET_CURRENT_POSITION, position);
            if (callback) {
                callback(position);
            }
        });
    }

}

export default Geolocation;


/**
navigator.geolocation.getCurrentPosition(function(position) {
  do_something(position.coords.latitude, position.coords.longitude);
});
 */