import React, { useState } from 'react';
import { ModalObject } from '../Modal/Modal';
import { uid } from 'uid';
import ModalContainer from '../Modal';
import ToastContainer from '../Toast';
import { ToastOptions, ToastObject } from '../Toast/Toast';

// =============================================================================
// TYPES
// =============================================================================
interface CosmicContextValues {
    Modal: ModalMethods;
    Toast: ToastMethods;
}

interface ModalMethods {
    show: <Type>(object: React.FC<Type>, props: Type) => void;
    hide: (id: string) => void;
}

interface ToastMethods {
    success: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
    custom: (message: string, options?: ToastOptions) => void;
    remove: (id: string) => void;
}

// =============================================================================
// CONTEXT
// =============================================================================
const CosmicContext = React.createContext<CosmicContextValues>({} as CosmicContextValues);
export const useCosmic = () => React.useContext(CosmicContext);

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const CosmicProvider = ({ children }: { children: any }) => {
    // =========================================================================
    // STATES
    // =========================================================================
    const [modals, setModals] = useState<ModalObject[]>([]);
    const [toasts, setToasts] = useState<ToastObject[]>([]);

    // =========================================================================
    // TOAST
    // =========================================================================
    const Toast: ToastMethods = {
        success: (message, options) => addToast(message, 'success', options),
        warning: (message, options) => addToast(message, 'warning', options),
        error: (message, options) => addToast(message, 'error', options),
        info: (message, options) => addToast(message, 'info', options),
        custom: (message, options) => addToast(message, 'custom', options),
        remove: (id: string) => removeToast(id)
    };

    // GENERAL ADD TOAST METHOD
    const addToast = React.useCallback(
        (message: string, type: string, options: ToastOptions | undefined) => {
            const newToastObject: ToastObject = {
                message,
                type,
                id: uid(),
                options: options || {}
            };

            setToasts(toasts => [...toasts, newToastObject]);
        },
        [setToasts]
    );

    // GENERAL REMOVE TOAST METHOD
    const removeToast = React.useCallback(
        (id: string) => setToasts(toasts => toasts.filter(toast => toast.id !== id)),
        [toasts]
    );

    // =========================================================================
    // MODALS
    // =========================================================================
    const Modal: ModalMethods = {
        show: (object, props) => {
            addModal({
                component: object,
                props,
                id: uid()
            });
        },
        hide: id => removeModal(id)
    };

    // Add Modal Method
    const addModal = React.useCallback(
        (newModal: ModalObject) => {
            setModals(modals => [newModal, ...modals]);
        },
        [setModals]
    );

    // Remove Modal Method
    const removeModal = React.useCallback(
        (id: string) => {
            setModals(modals => modals.filter(modal => modal.id !== id));
        },
        [modals]
    );

    // =========================================================================
    // VALUES
    // =========================================================================
    const values = { Modal, Toast };

    return (
        <CosmicContext.Provider value={values}>
            {children}
            <ToastContainer toasts={toasts} />
            <ModalContainer modals={modals} />
        </CosmicContext.Provider>
    );
};

export default CosmicProvider;
