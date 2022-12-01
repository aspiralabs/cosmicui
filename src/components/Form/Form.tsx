import React, { FormHTMLAttributes, forwardRef, InputHTMLAttributes, ReactElement, useState } from 'react';
import { AnyObjectSchema } from 'yup';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    /**
     * Disables all fields inside the form. Useful if using the form with
     * an API and want to disable inputs while submitting data.
     */
    disabled?: boolean;
    /**
     * Returns an object with values from form submission
     */
    onSubmit: (values: any) => any;
    /**
     * Pass a yup object to validate a form.
     * Defaults to validate on submission.
     * The yup key MUST match the form elemnt name
     */
    validation?: AnyObjectSchema;
    /** Determine when to validate a field. Defaults to Submit
     * @option live - Validates the input on every keystroke
     * @option blur - Validates the input when the input blurs
     * @option submit - Validates the input when the form submits
     */
    validationStrategy?: 'live' | 'blur' | 'submit';
}

interface FormValueReturn {
    [key: string]: any;
}

interface FormErrorMessages {
    [key: string]: string;
}

interface FormContextValues {
    formErrors: FormErrorMessages;
    clearAllErrors: () => void;
    clearFieldError: (name: string) => void;
    disabledForm: boolean | undefined;
    inputValidateCallback: (name: string, value: any) => void;
    validationStrategy: 'live' | 'blur' | 'submit';
}

// =============================================================================
// MAINC OMPONENT
// =============================================================================
const FormContext = React.createContext<FormContextValues>({} as FormContextValues);
const Form = forwardRef<HTMLFormElement, FormProps>((props: FormProps, ref) => {
    // Props
    const { onSubmit, children, validation, validationStrategy = 'submit', disabled, ...passThrough } = props;

    //States
    const [formErrors, setFormErrors] = useState<FormErrorMessages>({} as FormErrorMessages);

    // =========================================================================
    // ACTIONS
    // =========================================================================
    const setErrorMessages = (errors: any) => {
        const newFormState: FormErrorMessages = {};
        errors?.forEach((error: any) => {
            newFormState[error.path] = error.message;
        });

        setFormErrors(newFormState);
    };

    const clearAllErrors = () => {
        setFormErrors({});
    };

    const clearFieldError = (name: string) => {
        const newErrorObject = { ...formErrors };
        delete newErrorObject[name];
        setFormErrors(newErrorObject);
    };

    const inputValidateCallback = (name: string, value: any) => {
        validation &&
            validation
                .validateAt(name, { [name]: value })
                .then(() => {
                    // Check if there was an error and remove it if it passes
                    if (formErrors[name]) {
                        clearFieldError(name);
                    }
                })
                .catch(error => {
                    setFormErrors(errors => ({ ...errors, [name]: error.errors[0] }));
                });
    };

    // =========================================================================
    // SUBMISSION
    // =========================================================================
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent Page Refresh
        e.preventDefault();

        // Clear any Errors for UX Purposes
        clearAllErrors();

        // Payload for Return
        const payload: FormValueReturn = {};

        // Input types that have a 'element.value' object
        const inputTypes = [
            'password',
            'text',
            'email',
            'textarea',
            'select-one',
            'date',
            'datetime-local',
            'color',
            'month',
            'number',
            'tel',
            'time',
            'url',
            'week'
        ];

        // Find All HTML Form Elements
        Array.prototype.forEach.call(e.currentTarget.elements, element => {
            // Get all elements with 'element.value'
            if (inputTypes.includes(element.type) && element.name) {
                payload[element.name] = element.value;
            }

            // Checkboxes dont have 'element.value'
            if (element.type === 'checkbox' && element.name) {
                payload[element.name] = element.checked;
            }

            // Multiple Selects are processed and turned into arrays
            if (element.type === 'select-multiple' && element.name) {
                const valuesArray: any[] = [];
                Array.prototype.forEach.call(element.selectedOptions, option => {
                    valuesArray.push(option.value);
                });

                payload[element.name] = valuesArray;
            }
        });

        console.log('payload', payload);

        // Form Validation
        if (validation) {
            validation
                .validate(payload, { abortEarly: false })
                .then(() => {
                    onSubmit(payload);
                })
                .catch(error => {
                    setErrorMessages(error.inner);
                });
        } else {
            onSubmit(payload);
        }
    };

    // =========================================================================
    // CREATE CHILDREN
    // =========================================================================
    const values = {
        formErrors,
        clearAllErrors,
        clearFieldError,
        disabledForm: disabled,
        inputValidateCallback,
        validationStrategy
    };
    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <FormContext.Provider value={values}>
            <form ref={ref} {...passThrough} onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
});

// =============================================================================
// HOOK AND EXPORTS
// =============================================================================
export const useFormContext = () => React.useContext(FormContext);
export default Form;
