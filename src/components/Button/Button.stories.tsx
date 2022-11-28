// Generated with util/create-component.js
import React from 'react';
import Button from './Button';

export default {
    title: 'Button'
};

export const BasicButton = () => {
    return (
        <div className="flex gap-4">
            <button className="btn-primary rounded-full">Hello World 2</button>
            <button className="btn-primary-outlined">Hello World 2</button>
            <Button>Hello World</Button>
        </div>
    );
};
