import React, { useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useCosmic } from '../CosmicProvider';
import { options } from 'joi';

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
            <AnimatePresence>
                {toasts.map(toast => (
                    <ToastMessage key={toast.id} toast={toast} />
                ))}
            </AnimatePresence>
        </div>
    );
};

// =============================================================================
// TOAST MESSAGE
// =============================================================================
const ToastMessage = ({ toast }: { toast: ToastObject }) => {
    const { Toast } = useCosmic();

    let variant = toast.type === 'custom' ? toast.options.variant : toast.type;
    let toastStyles = `bg-${variant} text-${variant}-pair`;

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
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
            exit={{
                opacity: 0,
                y: 20,
                scale: 0.2,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
            className={`${toastStyles} px-6 py-4 rounded shadow-lg text-sm relative flex gap-4 items-center`}
            layout
        >
            <div>{toast.message}</div>
        </motion.div>
    );
};

export default Toast;
