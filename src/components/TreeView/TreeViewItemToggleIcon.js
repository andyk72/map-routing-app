import React from 'react';

const TreeViewItemToggleIcon = ({ isOpen, style, onClick }) => (
    <div className="rstm-toggle-icon" style={ style || {} } onClick={ onClick }>
        <div role="img" aria-label="Toggle" className="rstm-toggle-icon-symbol">
            {isOpen ? '-' : '+'}
        </div>
    </div>
);

export default TreeViewItemToggleIcon;