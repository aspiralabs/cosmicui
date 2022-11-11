import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

// =============================================================================
// INTERFACE
// =============================================================================
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    inputClass?: string;
    label?: string;
    description?: string;
    required?: boolean;
    error?: string;
}

export interface InputLabelProps {
    label: string;
    htmlFor: string;
    required?: boolean;
}

// =============================================================================
// CLASSES
// =============================================================================
const baseClass = `
    bg-surface 
    hover:bg-surface-hover 
    px-4 
    h-10 
    rounded-theme-input
    text-sm
    placeholder:text-body
    placeholder:text-opacity-50
    text-body
    outline-primary
`;

const checkboxBaseClass = `
    appearance-none 
    h-full
    w-full
    rounded-theme-input
    bg-ghost
    cursor-pointer
    checked:bg-primary
    disabled:bg-surface
    disabled:cursor-not-allowed
    transition-all
    motion-reduce:transition-none
`;

// =============================================================================
// MAIN COMPONENT

// =============================================================================
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props: CheckboxProps, ref) => {
    // Props
    const { label, required, value, checked, onChange, disabled, ...passThrough } = props;

    // Check State
    const defaultChecked = checked || value ? true : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);

    // Actions
    const toggleChecked = () => {
        setIsChecked(state => !state);
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <div className="flex text-sm w-full gap-2">
            <div className="h-5 w-5 relative">
                {isChecked && (
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 pointer-events-none text-white text-xs top-1/2 transform h-4 w-4 flex items-center justify-center">
                        <Checkmark />
                    </div>
                )}
                <input
                    type="checkbox"
                    ref={ref}
                    {...passThrough}
                    className={checkboxBaseClass}
                    checked={isChecked}
                    onChange={toggleChecked}
                    disabled={disabled}
                />
            </div>
            <span className="text-body text-theme-input-label cursor-default" onClick={toggleChecked}>
                {label} {required && <span className="text-error">*</span>}
            </span>
        </div>
    );
});

const Checkmark = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
};

// =============================================================================
// EXPORT
// =============================================================================
export default Checkbox;
