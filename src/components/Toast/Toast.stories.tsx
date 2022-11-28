import React from 'react';
import Button from '../Button';
import { useCosmic } from '../CosmicProvider';

export default {
    title: 'Toast'
};

export const BasicToast = () => {
    const { Toast } = useCosmic();

    const handleButtonClick = () => {
        Toast.success('Hello World');
    };

    return (
        <div className="flex gap-4">
            <Button variant="ghost" onClick={handleButtonClick}>
                Click
            </Button>
        </div>
    );
};
