// Generated with util/create-component.js
import React from 'react';
import Input from './Input';

export default {
    title: 'Input'
};

export const BasicInput = () => {
    return (
        <div className="flex flex-col gap-4">
            <Input label="First Name" placeholder="John Doe" />
            <input className="input" placeholder="native element" />
        </div>
    );
};
