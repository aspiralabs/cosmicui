import React, { FormHTMLAttributes, forwardRef, useState } from 'react';
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
    defaultFormValues?: { [key: string]: any };
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

/**
 * Used to recursively loop through children of a form and assign default values to any inputs.
 * Note that an input name prop has to match the key in the defaultFormValues.
 *
 * Example
 * -------------------------------------------------
 * Input: <input name="firstName" />
 * DefaultFormValue = { firstName: 'Dave' }
 * -------------------------------------------------
 *
 * @param children
 * @param defaultFormValues
 * @returns
 */
const applyRecursiveProps = (children: React.ReactNode, defaultFormValues: { [key: string]: any }) => {
    if (typeof children === 'undefined') return; // has no children elements

    return React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        // Recursively general children if there are children
        const recursiveGrandchildren: any = applyRecursiveProps(child.props.children, defaultFormValues);

        // This is a check for Cosmic Radio Buttons
        if (defaultFormValues[child.props['data-option-value']]) {
            // TODO: Ideally this would detect if the input element can have a
            // 'defaultValue' or 'defaultChecked' prop. Technically, passing both
            // works for now.
            return React.cloneElement(child, {
                ...child.props,
                defaultChecked: defaultFormValues[child.props['data-option-value']]
            });
        }

        // If a Name Value Exists, we've usually hit an element with no children (such as input)
        if (defaultFormValues[child.props.name]) {
            // TODO: Ideally this would detect if the input element can have a
            // 'defaultValue' or 'defaultChecked' prop. Technically, passing both
            // works for now.
            return React.cloneElement(child, {
                ...child.props,
                defaultValue: defaultFormValues[child.props.name],
                defaultChecked: defaultFormValues[child.props.name]
            });
        }
        // If a name value doesn't exist we may or may not have children.
        else {
            return React.cloneElement(child, { ...child.props, children: recursiveGrandchildren });
        }
    });
};

// =============================================================================
// MAINC OMPONENT
// =============================================================================
const FormContext = React.createContext<FormContextValues>({} as FormContextValues);
const Form = forwardRef<HTMLFormElement, FormProps>((props: FormProps, ref) => {
    // Props
    const {
        onSubmit,
        children,
        validation,
        validationStrategy = 'submit',
        disabled,
        defaultFormValues,
        ...passThrough
    } = props;

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
            'tel',
            'time',
            'url',
            'week'
        ];

        // Find All HTML Form Elements
        Array.prototype.forEach.call(e.currentTarget.elements, element => {
            if (element.type === 'range' || element.type === 'number') {
                payload[element.name] = Number(element.value);
            }

            if (element.type === 'radio') {
                const key = element.getAttribute('data-option-value') || undefined;
                if (key) {
                    payload[element.name] = { ...payload[element.name], [key]: element.checked };
                }
            }

            // Get all elements with 'element.value'
            if (inputTypes.includes(element.type) && element.name) {
                let value = element.value;

                // HTML inputs return undefined as a string, here we just convert it to
                // javascript undefiend
                if (element.value == 'undefined') value = undefined;
                if (element.value == 'null') value = null;

                payload[element.name] = value;
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
    // VALUES
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
                {defaultFormValues ? applyRecursiveProps(children, defaultFormValues) : children}
            </form>
        </FormContext.Provider>
    );
});

// =============================================================================
// HOOK AND EXPORTS
// =============================================================================
export const useFormContext = () => React.useContext(FormContext);
export default Form;
