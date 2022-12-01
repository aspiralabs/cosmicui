import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { onClickOutside } from '../../hooks';

interface DrawerProps {
    location?: 'right' | 'left';
    open: boolean;
    children?: any;
    width?: number;
    onClose?: any;
}

const Drawer = (props: DrawerProps) => {
    const { width = 300, location = 'right', onClose } = props;
    const controls = useAnimation();
    const drawerRef = useRef<any>(null);

    const drawerAnimationStyles = {
        active: { x: location === 'right' ? `calc(100vw - ${width}px)` : 0 },
        inactive: { x: location === 'right' ? '100vw' : -width }
    };

    const backdropAnimationStyles = {
        active: { background: 'rgba(0,0,0,0.25)' },
        inactive: { background: 'rgba(0,0,0,0)' }
    };

    onClickOutside(drawerRef, () => {
        onClose && onClose();
    });

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        controls.start(props.open ? 'active' : 'inactive');
    }, [props.open, controls]);

    return (
        <motion.div
            className={`fixed top-0 left-0 h-screen w-screen 
                ${props.open ? 'pointer-events-auto' : 'pointer-events-none'}
            `}
            animate={controls}
            variants={backdropAnimationStyles}
            initial="inactive"
            transition={{ type: 'spring', damping: 10, mass: 0.2, stiffness: 100 }}
            style={{ zIndex: 100 }}
        >
            <motion.div
                className="h-screen bg-white pointer-events-auto"
                style={{ width }}
                animate={controls}
                variants={drawerAnimationStyles}
                initial="inactive"
                transition={{ type: 'spring', damping: 10, mass: 0.2, stiffness: 100 }}
                ref={drawerRef}
            >
                {props.children}
            </motion.div>
        </motion.div>
    );
};

export default Drawer;
