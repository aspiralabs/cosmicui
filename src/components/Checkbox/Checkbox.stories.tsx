// Generated with util/create-component.js
import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Checkbox from './Checkbox';

export default {
    title: 'Checkbox',
};

export const BasicCheckbox = () => {
    return (
        <div className="flex flex-col gap-4">
            <Checkbox label="Do you like components?" name="likeComponents" />
            <Checkbox label="Do you like components?" name="likeComponents" checked />
        </div>
    );
};
