import React, { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { assignRefs } from '../../utility/general';
import { InputDescription, InputError, InputLabel } from '../Common/InputPieces';
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
// COMPONENT
// =============================================================================
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, passedRef) => {
    const { formErrors, disabledForm, inputValidateCallback, validationStrategy } = useFormContext();
    const { label, description, required, error, defaultValue, minHeight = 100, ...passThrough } = props;
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

            if (minHeight && scrollHeight < minHeight) {
                textareaRef.current.style.height = minHeight + 'px';
            } else if (props.maxHeight && scrollHeight > props.maxHeight) {
                textareaRef.current.style.height = props.maxHeight + 'px';
            } else {
                textareaRef.current.style.height = scrollHeight + 'px';
            }
        }
    }, [value]);

    useEffect(() => {
        if (defaultValue) setValue(defaultValue);
    }, []);

    return (
        <div className="flex flex-col text-sm w-full">
            {label && <InputLabel label={label} required={required} htmlFor={uniqueInputId} />}
            {description && <InputDescription description={description} />}
            <textarea
                {...passThrough}
                ref={assignRefs(textareaRef, passedRef)}
                onChange={textAreaChange}
                className={`textarea ${props.className}`}
                value={value}
                role="textbox"
            />

            {/* Can Receive Error from prop or from form context */}
            {error && <InputError error={error} />}
            {props.name && formErrors && formErrors[props.name] && <InputError error={formErrors[props.name]} />}
        </div>
    );
});

export default TextArea;
