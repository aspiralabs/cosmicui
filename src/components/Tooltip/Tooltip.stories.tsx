import React from 'react';
import Button from '../Button';
import Tooltip from './Tooltip';

export default {
    title: 'Tooltip'
};

export const BasicTooltip = () => {
    return (
        <div className="px-32">
            <div className="mb-32">
                <Tooltip position="bottom">
                    <Button>I am Button</Button>
                </Tooltip>
            </div>
            <div className="mb-32">
                <Tooltip position="top">
                    <Button>I am Button</Button>
                </Tooltip>
            </div>
            <div className="mb-32">
                <Tooltip position="left">
                    <Button>I am Button</Button>
                </Tooltip>
            </div>
            <div className="mb-32">
                <Tooltip position="right">
                    <Button>I am Button</Button>
                </Tooltip>
            </div>
        </div>
    );
};
