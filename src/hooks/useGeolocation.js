/**
 * useGeolocation hook
 * 
 *  Adds geolocation functionality
 * 
 * @dependencies
 * 
 * 
 */

import React from 'react';

import Geolocation from '../libs/geolocation/geolocation';

/**
 * @param {Object} options
 *  .subscriptions
 */
export default (options) => {

    const [geolocator, setGeolocator] = React.useState();

    React.useEffect(() => {
        console.log('================================================> useGeolocation.useEffect ONMOUNT');
        // create geolocation instance
        const geo = Geolocation.factory(options);
        // store geolocation instance in component state
        setGeolocator(geo);
    }, []);

    return geolocator;

}