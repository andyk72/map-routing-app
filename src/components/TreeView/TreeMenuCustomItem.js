import React from 'react';

import TreeViewItemToggleIcon from './TreeViewItemToggleIcon';

import './TreeMenuCustomItem.css';

const TreeMenuCustomItem = props => {
    return (
        <li className={ `rstm-tree-item rstm-tree-item-level${ props.level } ${props.hasNodes ? "rstm-tree-item--branch" : "rstm-tree-item--leaf"}`  }>
        {props.hasNodes && (
            <TreeViewItemToggleIcon
                isOpen={ props.isOpen }
                style={ props.style }
                onClick={e => {
                    props.hasNodes && props.toggleNode && props.toggleNode();
                    e.stopPropagation();
                }} />
          )}
        { props.children }
        </li>
    );
};

export default TreeMenuCustomItem;