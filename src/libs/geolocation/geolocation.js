/**
 * geolocation module
 * 
 *  Provides geolocation functionality through the browser navigator.geolocation API
 * 
 * @public
 * 
 *  Geolocation Class
 */

export const GeolocationEvents = {
    ON_GET_CURRENT_POSITION: 'ON_GET_CURRENT_POSITION',
    ON_WATCH_POSITION: 'ON_WATCH_POSITION'
};

class Geolocation {

    static factory(options) {
        // geolocation is available
        if ("geolocation" in navigator) {
            return new Geolocation(options);
        // geolocation is not available
        } else {
            console.error('Geolocation is not available');
            throw Error('Geolocation is not available');
        }
    }

    constructor(options = {}) {

        // init properties
        this.subscriptions = {};
        this.positionWatcher = null;
        this.currentPosition = null;
        this.positionsHistory = [];

        // init subscriptions, if any
        if (options.subscriptions) {
            this.initSubscriptions(options.subscriptions);
        }

        // init position reading
        this.initPosition();

        // start listening to position changes
        this.listen();
        
    }

    initSubscriptions(subscriptions) {
        this.subscriptionsAdd(subscriptions);
    }

    initPosition() {
        this.getPosition();
    }

    subscribe(event, callback) {
        if (!this.subscriptions[event]) {
            this.subscriptions[event] = [];
        }
        this.subscriptions[event].push(callback);
    }

    subscriptionsAdd(subscriptions) {
        subscriptions.forEach(subscription => {
            this.subscribe(subscription.event, subscription.callback);
        });
    }

    dispatch(event, params = {}) {
        if (!this.subscriptions[event]) {
            return;
        }
        this.subscriptions[event].forEach(callback => callback(params));
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
            timeout           : 3000 // 27000
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
            console.log('Geolocation.getPosition() -> received position ', position);
            this._updatePosition(position);
            this.dispatch(GeolocationEvents.ON_GET_CURRENT_POSITION, position);
            if (callback) {
                callback(position);
            }
        });
    }

    _updatePosition(position) {
        this.currentPosition = position;
        this.positionsHistory.push(position);
    }

    _resetPosition() {
        this.currentPosition = null;
        this.positionsHistory = [];
    }

}

export default Geolocation;