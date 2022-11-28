// Generated with util/create-component.js
import React, { useRef, useState } from 'react';
import TextArea from './TextArea';

export default {
    title: 'Text Area'
};

export const BasicTextArea = () => {
    return (
        <div className="flex flex-col gap-4">
            <TextArea label="Comment" placeholder="Enter your Message" minHeight={100} />
            <textarea className="textarea" placeholder="vanilla element" rows={4} />
        </div>
    );
};
