import React from 'react';

interface DropdownProps {
    children: any;
    menuOptions: DropdownEntry[];
}

interface DropdownEntry {
    text?: string;
    action?: any;
    custom?: any;
}

const Dropdown = ({ children, menuOptions }: DropdownProps) => {
    return (
        <div className="dropdown">
            {children}
            <ul tabIndex={0} className="dropdown-content">
                {menuOptions.map(option => {
                    if (option.custom) return option.custom;
                    else return <li onClick={option.action}>{option.text}</li>;
                })}
            </ul>
        </div>
    );
};

export default Dropdown;
