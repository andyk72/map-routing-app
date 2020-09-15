import React from 'react';

import { connect } from 'react-redux';
import { coordsRegister } from '../../redux/actions/actionsGeolocation';

import { GeolocationEvents } from '../../libs/geolocation/geolocation';
import useGeolocation from '../../hooks/useGeolocation';
import { geolocationCoordinatesToLatLng } from '../../data/geolocationFormatter';

import LeafletMap from '../../libs/leaflet/LeafletMap';

import '../../libs/leaflet/assets/leaflet.css'; // leaflet native css
import '../../libs/leaflet/assets/leaflet-routing-machine.css'; // leaflet-routing-machine native css
import styles from './Map.module.css';

const mapDispatch = dispatch => ({
    positionDetected: position => {
        dispatch(coordsRegister(position.coords));
    }
});

const Map = (props) => {

    const [leafletMap, setLeafletMap] = React.useState(null);

    // When leafletMap is instantiated -> subscribe to watch
    React.useEffect(() => {
        if (leafletMap && geolocator) {
            geolocator.subscribe(
                GeolocationEvents.ON_WATCH_POSITION,
                (position) => {
                    console.log('ON_WATCH_POSITION');
                    console.log('    position = ', position);
                    props.positionDetected(position);
                    leafletMap.updateCenter(geolocationCoordinatesToLatLng(position.coords));
                }
            );
        }
    }, [leafletMap]);

    const geolocator = useGeolocation({
        subscriptions: [
            {
                event: GeolocationEvents.ON_GET_CURRENT_POSITION,
                callback: (position) => {
                    if (!leafletMap) {
                        leafletMapInit({
                            position
                        });
                    }
                }
            }
        ]
    });

    const onClickHandler = (evt) => {};

    /**
     * Inits (renders) LeafletMap instance
     * @param {Object} options
     *  .position
     *      .coords
     *          .latitude
     *          .longitude 
     */
    const leafletMapInit = ({ position }) => {

        // Exit if leafletMap has already been instantiated
        if (leafletMap) {
            return;
        }

        const startCenter = [position.coords.latitude, position.coords.longitude];
        
        // Create LeafletMap instance
        const map = new LeafletMap({
            startCenter
        });

        // Render the map
        map.render();
        
        // render route example
        //map.renderRoute([
        //    [57.74, 11.94],
        //    [57.6792, 11.949]
        //]);

        // store LeafletMap instance in component state
        setLeafletMap(map);

    }

    return (
        <div id="map" className={ styles.map } onClick={ onClickHandler }></div>
    );

    /**
    TESTING geolocator creation
    return (
        <React.Fragment>
        {geolocator
            ? <div className="mntr">geolocator { JSON.stringify(geolocator.subscriptions) }</div>
            : <div>NO GEOLOCATOR STILL</div>
        }
        <div id="map" className={ styles.map } onClick={ onClickHandler }></div>
        </React.Fragment>
    );
     */

};

export default connect(null, mapDispatch)(Map);