import React from 'react';

import styles from './TreeViewItem.module.css';

const TreeViewItem = props => {
    return (
        <div className={ styles.tvItem } style={ props.style || {} }>
            <span className="tv-item-label">{ props.label }</span>
            { props.value &&
                <span className="tv-item-value">{ props.value }</span>
            }
        </div>
    );
}

export default TreeViewItem;