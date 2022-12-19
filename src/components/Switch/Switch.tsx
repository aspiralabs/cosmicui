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
// MAIN COMPONENT

// =============================================================================
const Radio = forwardRef<HTMLInputElement, SwitchProps>((props: SwitchProps, ref) => {
    // Props
    const { label, required, value, checked, onChange, disabled, variant = 'primary', ...passThrough } = props;

    const calculateInitialValue = () => {
        if (checked) return true;
        if (value) return true;
        if (props.defaultChecked === true) return true;
        return false;
    };

    // Check State
    const defaultChecked = calculateInitialValue();
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
        <div className="flex text-sm w-full gap-2 items-center">
            <input
                type="checkbox"
                ref={ref}
                {...passThrough}
                className={`switch-${variant}`}
                checked={isChecked}
                onChange={toggleChecked}
                disabled={disabled}
            />
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
