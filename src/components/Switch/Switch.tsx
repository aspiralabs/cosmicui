import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

// =============================================================================
// INTERFACE
// =============================================================================
export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
    inputClass?: string;
    label?: string;
    description?: string;
    required?: boolean;
    error?: string;
    variant?: string;
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
    rounded-full
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
    rounded-full
    bg-ghost
    cursor-pointer
    checked:bg-primary
    disabled:bg-surface
    disabled:cursor-not-allowed
    transition-all
`;

const innerCircleClass = `
    h-2.5 
    w-2.5 
    bg-ghost 
    rounded-full 
    absolute 
    transform 
    top-1/2 
    -translate-y-1/2 
    left-1/2 
    -translate-x-1/2
    pointer-events-none
`;

// =============================================================================
// MAIN COMPONENT

// =============================================================================
const Radio = forwardRef<HTMLInputElement, SwitchProps>((props: SwitchProps, ref) => {
    // Props
    const { label, required, value, checked, onChange, disabled, variant = 'primary', ...passThrough } = props;

    // Check State
    const defaultChecked = checked || value ? true : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);

    // Actions
    const toggleChecked = () => {
        console.log('clicked');
        setIsChecked(state => !state);
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <div className="flex text-sm w-full gap-2 items-center">
            <div className="relative" onClick={toggleChecked}>
                <input
                    type="checkbox"
                    ref={ref}
                    {...passThrough}
                    className="sr-only"
                    checked={isChecked}
                    onChange={toggleChecked}
                    disabled={disabled}
                />

                {/* Line */}
                <div
                    className={`
                        w-10 rounded-full shadow-inner transition  h-4
                        ${isChecked ? `bg-${variant}` : 'bg-surface'}
                    `}
                />

                {/* Dot */}
                <div
                    className={`
                        dot absolute transform bg-white rounded-full shadow w-6 h-6 -left-1 -top-1 transition 
                        ${isChecked ? 'translate-x-full' : 'translate-x-0'}
                    `}
                />
            </div>
            <span className="text-body text-theme-input-label cursor-default" onClick={toggleChecked}>
                {label} {required && <span className="text-error">*</span>}
            </span>
        </div>
    );
});

// =============================================================================
// EXPORT
// =============================================================================
export default Radio;
