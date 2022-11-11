// Generated with util/create-component.js
import React from 'react';
import Input from './Input';

export default {
    title: 'Input',
};

export const BasicInput = () => {
    return (
        <div className="flex flex-col gap-4">
            <Input label="First Name" placeholder="John Doe" />
            <Input label="First Name" placeholder="John Doe" required />
            <Input label="First Name" description="Please use your actual first name" placeholder="John Doe" required />
            <Input label="First Name" error="Please use your actual first name" placeholder="John Doe" required />
        </div>
    );
};
