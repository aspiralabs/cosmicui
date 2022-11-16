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
        Toast.warning('Hello World');
        Toast.error('Hello World');
        Toast.custom('Hello World', { variant: 'ghost' });
    };

    return (
        <div className="flex gap-4">
            <Button variant="ghost" onClick={handleButtonClick}>
                Click
            </Button>
        </div>
    );
};
