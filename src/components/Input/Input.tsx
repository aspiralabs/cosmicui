import React, { forwardRef, InputHTMLAttributes } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import { InputLabel, InputDescription, InputError } from '../Common/InputPieces';
import { useFormContext } from '../Form/Form';

// =============================================================================
// INTERFACE
// =============================================================================
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputClass?: string;
    label?: string;
    description?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
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
    disabled:cursor-not-allowed
    disabled:hover:bg-surface
    disabled:bg-opacity-75
    disabled:hover:bg-opacity-75
    motion-reduce:transition-none
`;

// =============================================================================
// RENDER
// =============================================================================
const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    const { formErrors, disabledForm, inputValidateCallback, validationStrategy } = useFormContext();
    const { inputClass, label, required, description, onChange, onBlur, disabled, error, ...passThrough } = props;
    const uniqueInputId = '1';

    // =========================================================================
    // ACTIONS
    // =========================================================================
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Call Back To Form If Inside a Form Context
        if (props.name && inputValidateCallback && validationStrategy === 'live') {
            inputValidateCallback(props.name, e.currentTarget.value);
        }

        // continue with normal behavir
        onChange && onChange(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        if (props.name && inputValidateCallback && validationStrategy === 'blur') {
            inputValidateCallback(props.name, e.target.value);
        }

        // Continue with normal behaviour
        onBlur && onBlur(e);
    };
    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <div className="flex flex-col text-sm w-full">
            {label && <InputLabel label={label} required={required} htmlFor={uniqueInputId} />}
            {description && <InputDescription description={description} />}
            <input
                ref={ref}
                {...passThrough}
                disabled={disabled || disabledForm}
                onChange={handleChange}
                onBlur={handleBlur}
                className={overrideTailwindClasses(`${baseClass} ${inputClass}`)}
            />

            {/* Can Receive Error from prop or from form context */}
            {error && <InputError error={error} />}
            {props.name && formErrors && formErrors[props.name] && <InputError error={formErrors[props.name]} />}
        </div>
    );
});

// =============================================================================
// EXPORT
// =============================================================================
export default Input;
