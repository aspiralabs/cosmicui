import React from 'react';
import Button from '../Button';
import { useCosmic } from '../CosmicProvider';

export default {
    title: 'Modal'
};

const ModalTest = () => {
    return (
        <div className="bg-white rounded p-8" style={{ width: 300 }}>
            <p>Hello World</p>
        </div>
    );
};

export const BasicModal = () => {
    const { Modal } = useCosmic();

    const handleButtonClick = () => {
        Modal.show(ModalTest, {});
    };

    return (
        <div className="flex gap-4">
            <Button variant="ghost" onClick={handleButtonClick}>
                Click
            </Button>
        </div>
    );
};
