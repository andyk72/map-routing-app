import React from 'react';

import Geolocation, { GeolocationEvents } from './libs/geolocation/geolocation';

import Map from './components/Map/Map';

import './App.css';

const geolocator = Geolocation.factory();
geolocator.subscribe(GeolocationEvents.ON_WATCH_POSITION, (position) => {
    console.log('------', position);
});

function App() {

  return (
    <div className="app">
        <Map geolocator={ geolocator } />
    </div>
  );
}

export default App;
