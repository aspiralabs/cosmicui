// Generated with util/create-component.js
import React from 'react';
import Select from './Select';

export default {
    title: 'Select'
};

export const BasicSelect = () => {
    return (
        <div className="flex flex-col gap-4">
            <Select
                label="First Name"
                placeholder="John Doe"
                options={[
                    { label: 'Bob', value: 'bob' },
                    { label: 'Jimmy', value: 'jimmy' },
                    { label: 'Kim', value: 'kim' }
                ]}
            />

            <select className="select">
                <option>Hello</option>
                <option>Hello</option>
            </select>
        </div>
    );
};
