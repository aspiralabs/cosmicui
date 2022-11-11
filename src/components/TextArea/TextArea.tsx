import { required } from 'joi';
import React, { InputHTMLAttributes, MutableRefObject, Ref, useEffect, useRef, useState } from 'react';
import { forwardRef } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import { assignRefs } from '../../utility/general';
import { InputLabel, InputDescription, InputError } from '../Common/InputPieces';
import { useFormContext } from '../Form/Form';

// =============================================================================
// TYPES
// =============================================================================
export interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    description?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    minHeight?: number;
    maxHeight?: number;
}

// =============================================================================
// CLASSES
// =============================================================================
const baseTextAreaClass = `
    bg-surface
    px-4 
    py-2
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
    min-h-12
`;

// =============================================================================
// COMPONENT
// =============================================================================
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, passedRef) => {
    const { formErrors, disabledForm, inputValidateCallback, validationStrategy } = useFormContext();
    const { label, description, required, error, ...passThrough } = props;
    const [value, setValue] = useState(props.value || '');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const uniqueInputId = '1';

    // =========================================================================
    // UPDATE TEXT VALUE
    // =========================================================================
    const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
        if (props.onChange) props.onChange(event);
    };

    // =========================================================================
    // UPDATE TEXT AREA SIZE
    // =========================================================================
    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = '0px';
            const scrollHeight = textareaRef.current.scrollHeight;

            if (props.minHeight && scrollHeight < props.minHeight) {
                textareaRef.current.style.height = props.minHeight + 'px';
            } else if (props.maxHeight && scrollHeight > props.maxHeight) {
                textareaRef.current.style.height = props.maxHeight + 'px';
            } else {
                textareaRef.current.style.height = scrollHeight + 'px';
            }
        }
    }, [value]);

    return (
        <div className="flex flex-col text-sm w-full">
            {label && <InputLabel label={label} required={required} htmlFor={uniqueInputId} />}
            {description && <InputDescription description={description} />}
            <textarea
                {...passThrough}
                ref={assignRefs(textareaRef, passedRef)}
                onChange={textAreaChange}
                className={overrideTailwindClasses(`${baseTextAreaClass} ${props.className}`)}
                value={value}
            />

            {/* Can Receive Error from prop or from form context */}
            {error && <InputError error={error} />}
            {props.name && formErrors && formErrors[props.name] && <InputError error={formErrors[props.name]} />}
        </div>
    );
});

export default TextArea;
