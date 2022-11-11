// Generated with util/create-component.js
import React, { useState } from 'react';

import Switch from './Switch';

export default {
    title: 'Switch',
};

export const BasicSwitch = () => {
    return (
        <div className="flex flex-col gap-4">
            <Switch label="Do you like components?" name="likeComponents" />
            <Switch label="Do you like components?" name="likeComponents" checked variant="purple" />
            <Switch label="Do you like components?" name="likeComponents" checked variant="success" />
            <Switch label="Do you like components?" name="likeComponents" checked variant="heading" />
        </div>
    );
};
