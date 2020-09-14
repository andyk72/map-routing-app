/**
 * TreeView Component
 *  Provides a tree view for Object (and Array?) data structures
 * 
 * @dependencies
 * 
 *  TreeMenu Component
 *  (react-simple-tree-menu (https://github.com/iannbing/react-simple-tree-menu))
 * 
 * @properties
 * 
 *  .data {Object}
 *  .TreeViewItem {ReactComponent}
 *  .item {Object}
 * 
 * @usage
 * 
 *  1) Uses TreeViewItemDefault for Items Gui
 *  <TreeView data={ treeData } />
 * 
 *  2) Uses passed in TreeViewItem for Items Gui
 *  <TreeView
 *      data={ treeData }
 *      TreeViewItem={props => <div>{props.value}</div>} />
 * 
 *  3) Use TreeMenu default Item for Items Gui
 *  <TreeView data={ treeData } keepTreeMenuGui />
 */

import React from 'react';

import TreeMenu from 'react-simple-tree-menu';
import TreeMenuCustomItem from './TreeMenuCustomItem';
import TreeViewItem from './TreeViewItem';

const TreeView = treeViewProps => {

    if (!treeViewProps.keepTreeMenuGui) {

        const TreeViewItemCustom = treeViewProps.TreeViewItem || null;
        const treeViewItemProps = treeViewProps.item || {};

        return (
            <TreeMenu data={ treeViewProps.data }>
                {({ search, items }) => (
                    <ul className="rstm-tree-item-group">
                        {items.map(({key, ...treeDataItemProps}) => {
                            let props = {...treeDataItemProps, ...treeViewItemProps};
                            return (
                                <TreeMenuCustomItem key={ key } {...props}>
                                    {TreeViewItemCustom
                                        ? <TreeViewItemCustom {...props} />
                                        : <TreeViewItem {...props} />}
                                </TreeMenuCustomItem>
                            );
                        })}
                    </ul>
                )}
            </TreeMenu>
        );

    } else {
        return <TreeMenu data={ treeViewProps.data } />;
    }

};

export default TreeView;