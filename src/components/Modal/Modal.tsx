import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Button from '../Button';
import { useCosmic } from '../CosmicProvider';

// =============================================================================
// INTERFACE
// =============================================================================
export interface CosmicModalProps {
    id?: string;
    closeIcon?: boolean;
}

export interface ModalObject {
    component: React.FC<any>;
    props: any;
    id: string;
}

// =============================================================================
// CONTAINER
// =============================================================================
const Modal = ({ modals }: { modals: ModalObject[] }) => {
    const controls = useAnimation();

    const backdropAnimationStyles = {
        active: { background: 'rgba(0,0,0,0.25)' },
        inactive: { background: 'rgba(0,0,0,0)' }
    };

    useEffect(() => {
        if (modals.length > 0) {
            controls.start('active');
        } else {
            controls.start('inactive');
        }
    }, [modals, controls]);

    return (
        <motion.div
            className="fixed top-0 left-0 h-screen w-screen pointer-events-none flex items-center justify-center"
            animate={controls}
            variants={backdropAnimationStyles}
            initial="inactive"
            transition={{ type: 'spring', damping: 10, mass: 0.2, stiffness: 100 }}
        >
            <AnimatePresence>
                {modals.map((modal: ModalObject, index: number) => (
                    <ModalContainer modal={modal} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

const ModalContainer = ({ modal }: { modal: ModalObject }) => {
    const { Modal } = useCosmic();

    const props = {
        id: modal.id,
        closeIcon: true,
        ...modal.props
    };

    // =========================================================================
    // ACTIONS
    // =========================================================================
    const modalAnimationStyles = {
        active: { opacity: 1, marginTop: 0 },
        inactive: { opacity: 0, marginTop: 50 }
    };

    const handleCloseModal = (id: string) => {
        Modal.hide(id);
    };

    useEffect(() => {}, []);

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <motion.div
            className="pointer-events-auto"
            initial={modalAnimationStyles.inactive}
            animate={modalAnimationStyles.active}
            exit={modalAnimationStyles.inactive}
            transition={{ type: 'spring', damping: 10, mass: 0.4, stiffness: 200 }}
        >
            <div className="relative">
                <div
                    className="absolute top-3 right-3 cursor-pointer"
                    style={{ zIndex: 10000 }}
                    onClick={() => handleCloseModal(modal.id)}
                >
                    <svg
                        className="w-4 h-4  stroke-body  hover:stroke-heading transition"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                {React.createElement<any>(modal.component, props)}
            </div>
        </motion.div>
    );
};

export default Modal;
