import React from 'react';
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
    const backdropBaseClass = `fixed top-0 left-0 h-screen w-screen bg-black transition ease-in-out duration-300 flex justify-center items-center z-modal-z`;
    const backdropClosedStyles = 'bg-opacity-0 pointer-events-none';
    const backdropOpenStyles = 'bg-opacity-25 pointer-events-auto';

    console.log('modal length', modals.length);

    return (
        <div className={`${backdropBaseClass} ${modals.length > 0 ? backdropOpenStyles : backdropClosedStyles}`}>
            {modals.map((modal: ModalObject, index: number) => (
                <ModalContainer modal={modal} key={index} />
            ))}
        </div>
    );
};

const ModalContainer = ({ modal }: { modal: ModalObject }) => {
    const { Modal } = useCosmic();

    const props = {
        id: modal.id,
        closeIcon: true,
        ...modal.props
    };

    const handleCloseModal = (id: string) => {
        Modal.hide(id);
    };

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <div className="pointer-events-auto animate-modal-intro">
            <div className="relative">
                <div className="absolute top-3 right-3 cursor-pointer" onClick={() => handleCloseModal(modal.id)}>
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
        </div>
    );
};

export default Modal;
