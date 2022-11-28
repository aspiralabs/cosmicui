// Generated with util/create-component.js
import React, { useState } from 'react';

import Switch from './Switch';

export default {
    title: 'Switch'
};

export const BasicSwitch = () => {
    return (
        <div className="flex flex-col gap-4">
            <input type="checkbox" className="switch-primary" />
            <input type="checkbox" className="switch-secondary" />
            <Switch label="Do you like components?" name="likeComponents" />
        </div>
    );
};
