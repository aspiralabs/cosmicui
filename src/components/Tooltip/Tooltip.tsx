import React from 'react';

interface ToolTipPros {
    children: any;
    position?: 'bottom' | 'top' | 'left' | 'right';
    content?: string;
}

const Tooltip = ({ children, position = 'bottom', content = 'tooltip' }: ToolTipPros) => {
    return (
        <div className={`tooltip tooltip-${position}`} data-tip={content}>
            {children}
        </div>
    );
};

export default Tooltip;
