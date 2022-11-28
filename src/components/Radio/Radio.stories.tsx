// Generated with util/create-component.js
import React, { useState } from 'react';

import Radio from './Radio';

export default {
    title: 'Radio'
};

export const BasicRadio = () => {
    return (
        <div className="flex flex-col gap-4">
            <input type="radio" className="radio-primary" />
            <input type="radio" className="radio-primary" checked={true} />
            <input type="radio" className="radio-success" checked={true} />

            {/* <Radio label="I like cookies" name="likeComponents" checked={true} /> */}
            <Radio label="I don't like cookies" name="dontComponents" />
            <Radio label="I don't like cookies" name="dontComponents2" variant="secondary" />
        </div>
    );
};
