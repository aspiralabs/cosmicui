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

// =============================================================================
// MAIN COMPONENT

// =============================================================================
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props: CheckboxProps, ref) => {
    // Props
    const { label, required, value, checked, onChange, disabled, variant = 'primary', ...passThrough } = props;

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
                <input
                    type="checkbox"
                    ref={ref}
                    {...passThrough}
                    className={`checkbox-${variant}`}
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
