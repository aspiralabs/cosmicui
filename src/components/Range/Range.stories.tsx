import React from 'react';
import Range from './Range';

export default {
    title: 'Range'
};

export const BasicRange = () => {
    return (
        <div className="flex flex-col gap-8 p-8">
            <Range />
            <input type="range" className="range-primary" />
        </div>
    );
};
