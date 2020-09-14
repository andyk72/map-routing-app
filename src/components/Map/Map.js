import React from 'react';

import { connect } from 'react-redux';
import { coordsRegister } from '../../redux/actions/actionsGeolocation';

import { GeolocationEvents } from '../../libs/geolocation/geolocation';
import useGeolocation from '../../hooks/useGeolocation';

import LeafletMap from '../../libs/leaflet/LeafletMap';

import '../../libs/leaflet/assets/leaflet.css'; // leaflet native css
import '../../libs/leaflet/assets/leaflet-routing-machine.css'; // leaflet-routing-machine native css
import styles from './Map.module.css';

const mapDispatch = dispatch => ({
    positionDetected: position => {
        console.log('position.coords = ', position.coords);
        dispatch(coordsRegister(position.coords));
    }
});

const Map = (props) => {

    const [leafletMap, setLeafletMap] = React.useState(null);

    const geolocator = useGeolocation({
        subscriptions: [
            {
                event: GeolocationEvents.ON_WATCH_POSITION,
                callback: (position) => {
                    console.log('ON_WATCH_POSITION subscription ', position);
                    console.log('    [TODO] : dispatch(coordsRegister(position.coords))');
                    console.log('position = ', position);
                    props.positionDetected(position);
                }
            },
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

    const onClickHandler = (evt) => {
        leafletMapInit({position:0});
    };

    /**
     * Inits (renders) LeafletMap instance
     * @param {Object} options
     *  .position
     *      .coords
     *          .latitude
     *          .longitude 
     */
    const leafletMapInit = ({ position }) => {
        if (leafletMap) {
            return;
        }
        
        // Create LeafletMap instance
        const map = new LeafletMap({
            startCenter: [position.coords.latitude, position.coords.longitude]
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