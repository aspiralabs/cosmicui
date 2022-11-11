import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

// =============================================================================
// INTERFACE
// =============================================================================
export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
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
    motion-reduce:transition-none
`;

const innerCircleClass = `
    h-2.5 
    w-2.5 
    bg-ghost 
    rounded-full 
    absolute 
    top-1/2 
    transform 
    -translate-y-1/2 
    left-1/2 
    -translate-x-1/2
`;

// =============================================================================
// MAIN COMPONENT

// =============================================================================
const Checkbox = forwardRef<HTMLInputElement, RadioProps>((props: RadioProps, ref) => {
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
            <div className="h-5 w-5 relative ">
                {isChecked && <div className={innerCircleClass} />}
                <input
                    type="radio"
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

// =============================================================================
// EXPORT
// =============================================================================
export default Checkbox;
