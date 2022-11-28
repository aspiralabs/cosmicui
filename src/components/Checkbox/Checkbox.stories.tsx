// Generated with util/create-component.js
import React, { useState } from 'react';

import Checkbox from './Checkbox';

export default {
    title: 'Checkbox'
};

export const BasicCheckbox = () => {
    return (
        <div className="flex flex-col gap-4">
            <input type="checkbox" className="checkbox-primary" />
            <input type="checkbox" checked={true} className="checkbox-success" />

            <Checkbox label="Do you like components?" name="likeComponents" />
            <Checkbox label="Do you like components?" name="likeComponents" variant="secondary" />
        </div>
    );
};
