import React from 'react';
import useGeolocation from '../../hooks/useGeolocation';

import LeafletMap from '../../libs/leaflet/LeafletMap';

import '../../libs/leaflet/assets/leaflet.css'; // leaflet native css
import '../../libs/leaflet/assets/leaflet-routing-machine.css'; // leaflet-routing-machine native css
import styles from './Map.module.css';

const Map = () => {

    const geolocator = useGeolocation();

    React.useEffect(() => {

        geolocator.getPosition((position) => {
            console.log('getPosition callback ', position);
            //const leafletMap = new LeafletMap();
            const leafletMap = new LeafletMap({
                startCenter: [position.coords.latitude, position.coords.longitude]
            });
            leafletMap.render();
            /*
            leafletMap.renderRoute([
                [57.74, 11.94],
                [57.6792, 11.949]
            ]);
            */
        });

        //map.routeAppendPoint([57.300, 11.949]);
    }, [geolocator]);

    return (
        <div id="map" className={ styles.map }></div>
    );

};

export default Map;