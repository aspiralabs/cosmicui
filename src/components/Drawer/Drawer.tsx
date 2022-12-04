import React, { useRef } from 'react';
import { onClickOutside } from '../../hooks';

interface DrawerProps {
    location?: 'right' | 'left';
    open: boolean;
    children?: any;
    width?: number;
    onClose?: any;
}

const Drawer = (props: DrawerProps) => {
    const { width = 300, location = 'right', onClose, open } = props;
    const drawerRef = useRef<any>(null);

    onClickOutside(drawerRef, () => {
        onClose && onClose();
    });

    const backdropBaseClass = `fixed top-0 left-0 h-screen w-screen bg-black transition ease-in-out duration-300 z-drawer-z`;
    const backdropClosedStyles = 'bg-opacity-0 pointer-events-none';
    const backdropOpenStyles = 'bg-opacity-25 pointer-events-auto';

    const drawerPosition = location === 'right' ? 'right-0' : 'left-0';
    const drawerBaseClass = `h-screen bg-white pointer-events-auto absolute transition transform ${drawerPosition} ease-in-out duration-300`;
    const drawerOpenClass = 'translate-x-0';
    const drawerCloseClass = location === 'right' ? 'translate-x-full' : '-translate-x-full';

    return (
        <div className={`${backdropBaseClass} ${open ? backdropOpenStyles : backdropClosedStyles}`}>
            <div
                className={`${drawerBaseClass} ${open ? drawerOpenClass : drawerCloseClass}`}
                style={{ width }}
                ref={drawerRef}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Drawer;
