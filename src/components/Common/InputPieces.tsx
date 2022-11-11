import React from 'react';

export interface InputLabelProps {
    label: string;
    htmlFor: string;
    required?: boolean;
}

export const InputLabel = ({ label, required, htmlFor }: InputLabelProps) => {
    return (
        <label htmlFor={htmlFor} className="text-theme-input-label text-heading font-bold mb-2">
            {label}
            {required && (
                <span className="text-error" aria-hidden>
                    {' *'}
                </span>
            )}
        </label>
    );
};

export const InputDescription = ({ description }: { description: string }) => {
    return <span className="text-theme-input-description text-body mb-1 -mt-3">{description}</span>;
};

export const InputError = ({ error }: { error: string }) => {
    return <span className="text-theme-input-description text-error mt-1">{error}</span>;
};
