import React, { useEffect } from 'react';
import { useCosmic } from '../CosmicProvider';

export interface ToastObject {
    message: string;
    type: string;
    id: string;
    options: ToastOptions;
}

export interface ToastOptions {
    timeout?: number;
    variant?: string;
}
// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Toast = ({ toasts }: { toasts: ToastObject[] }) => {
    return (
        <div
            className="-translate-x-1/2 absolute bottom-0 flex flex-col gap-4 left-1/2 overflow-hidden p-4 transform w-full z-50"
            style={{ maxWidth: 500 }}
        >
            {toasts.map(toast => (
                <ToastMessage key={toast.id} toast={toast} />
            ))}
        </div>
    );
};

// =============================================================================
// TOAST MESSAGE
// =============================================================================
const ToastMessage = ({ toast }: { toast: ToastObject }) => {
    const { Toast } = useCosmic();

    let toastStyles = `bg-success text-success-pair`;

    // Timer Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            Toast.remove(toast.id);
        }, toast.options?.timeout || 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    // Main Render
    return (
        <div
            className={`${toastStyles} px-6 py-4 rounded shadow-lg text-sm relative flex gap-4 items-center animate-modal-intro`}
        >
            <div>{toast.message}</div>
        </div>
    );
};

export default Toast;
