/**
 * SystemMonitor
 * 
 * @properties
 * 
 *  .data {Object}
 */
import React from 'react';

import '../../../node_modules/react-simple-tree-menu/dist/main.css';

import TreeView from '../TreeView/TreeView';

import draggable from '../../libs/draggable/draggable';

import styles from './SystemMonitor.module.css';

const SystemMonitor = ({ data }) => {

    const [collapsed, setCollapsed] = React.useState(false);
    const [dragManager, setDragManager] = React.useState(null);

    const smRef = React.useRef(null);
    const smHeaderRef = React.useRef(null);

    React.useEffect(() => {
        drag();
    }, []);

    const drag = () => {
        const dragged = smRef.current;
        const dragger = smHeaderRef.current;
        setDragManager(draggable(dragged, dragger));
    };

    const handleCollapsed = (evt) => {
        setCollapsed(!collapsed);
    };

    return (
        <div className = { styles.systemMonitorContainer }>
            <div ref = { smRef } id = "system-monitor" className = { styles.systemMonitor }>
                <header ref = { smHeaderRef }>
                    System Monitor
                    <div
                        className = { collapsed ?
                            `${ styles.systemMonitorButton } ${ styles.systemMonitorButtonExpand }` :
                            `${ styles.systemMonitorButton } ${ styles.systemMonitorButtonCollapse }`
                        }
                        onClick = { handleCollapsed }/>
                </header>
                {!collapsed &&
                    <div className = { styles.systemMonitorBody }>
                        <TreeView
                            data={ data }
                            item={ {style: {color: 'white'}} } />
                    </div>
                }
            </div>
        </div>
    );

};

export default SystemMonitor;