import React from 'react';
import Button from '../Button';
import Dropdown from './Dropdown';

export default {
    title: 'Dropdown'
};

export const BasicDropdown = () => {
    const menuOptionOne = [{ text: 'Item 1' }, { text: 'Item 2' }];
    const menuOptionTwo = [{ custom: <Button>Hello</Button> }, { text: 'Item 2' }];

    return (
        <div className="flex gap-4 bg-surface p-8 h-screen">
            <Dropdown menuOptions={menuOptionTwo}>
                <Button>Hello World</Button>
            </Dropdown>
        </div>
    );
};
