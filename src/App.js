import React from 'react';

import { connect } from 'react-redux';

import SystemMonitor from './components/SystemMonitor/SystemMonitor';
import Map from './components/Map/Map';

import { objectToTreeViewDataObject } from './components/TreeView/treeViewUtils';

import './App.css';

const mapState = state => ({
    systemMonitorData: objectToTreeViewDataObject(state)
});

function App(props) {

    return (
        <div className="app">
            <Map />
            <SystemMonitor data={ props.systemMonitorData } />
        </div>
    );
    
}

export default connect(mapState)(App);
