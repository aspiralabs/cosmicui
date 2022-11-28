import React, { forwardRef, InputHTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import { InputLabel, InputDescription, InputError } from '../Common/InputPieces';
import { useFormContext } from '../Form/Form';
import dayjs from 'dayjs';
import { DatePickerDropdown } from './DatePickerDropdown';
import { assignRefs } from '../../utility/general';

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
    relative
    flex
    items-center
    w-full
`;

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
    displayFormat?: string;
    datetime?: boolean;
    native?: boolean;
}

interface DatePickerContextValues {
    id: string;
    internalDate: Date | undefined;
    currentDropdownView: string;
    handleSelectDate: (date: Date) => void;
    setCurrentDropdownView: any;
    datetime: boolean;
}

// =============================================================================
// ICONS
// =============================================================================
const CalendarIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 cursor-icon">
            <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
            <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clipRule="evenodd"
            />
        </svg>
    );
};

// =============================================================================
// COMPONENT
// =============================================================================
const DatePickerContext = React.createContext<DatePickerContextValues>({} as DatePickerContextValues);
export const useDatePicker = () => React.useContext(DatePickerContext);

const DatePicker = forwardRef<HTMLInputElement, InputProps>((props: InputProps, passedRef) => {
    const internalRef = useRef<HTMLInputElement | null>(null);
    const allyRef = useRef<HTMLInputElement | null>(null);
    const { formErrors, disabledForm, inputValidateCallback, validationStrategy } = useFormContext();
    const {
        inputClass,
        label,
        required,
        description,
        onChange,
        onBlur,
        disabled,
        error,
        displayFormat = props.datetime ? 'MM/DD/YYYY h:mm A' : 'MM/DD/YYYY',
        datetime = false,
        native = false,
        ...passThrough
    } = props;
    const uniqueInputId = '1';

    // HELPER
    const determineInitialDate = () => {
        if (!props.value) return undefined;
        if (props.value === '') return undefined;
        return new Date(props.value as string | number);
    };

    // =========================================================================
    // LOCAL STATES
    // =========================================================================
    const [internalDate, setInternalDate] = useState<Date | undefined>(determineInitialDate());
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentDropdownView, setCurrentDropdownView] = useState('picker');

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

    const handleInputClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSelectDate = (date: Date) => {
        setDropdownOpen(false);
        setInternalDate(date);
        if (allyRef && allyRef.current) {
            allyRef.current.focus();
        }
    };

    // =========================================================================
    // KEYPRESS LOGIC
    // =================================    ========================================
    const handleButtonKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
        if (!dropdownOpen) {
            switch (e.key) {
                case ' ': // Space
                case 'Enter':
                    e.preventDefault();
                    setDropdownOpen(true);
            }
        }

        if (dropdownOpen) {
            e.persist();

            switch (e.key) {
                case 'Esc':
                case 'Escape':
                    e.preventDefault();
                    setDropdownOpen(false);
                    return;
                //  case 'ArrowUp':
                //      e.preventDefault();
                //      setActiveIndex(activeIndex <= 0 ? filteredOptions.length - 1 : activeIndex - 1);
                //      break;
                //  case 'ArrowDown':
                //      e.preventDefault();
                //      setActiveIndex(activeIndex + 1 === filteredOptions.length ? 0 : activeIndex + 1);
                //      break;
                //  case 'Enter':
                //      e.preventDefault();
                //      selectOption(filteredOptions[activeIndex]);
                //      return;

                //  case 'PageUp':
                //  case 'Home':
                //      e.preventDefault();
                //      setActiveIndex(0);
                //      return;
                //  case 'PageDown':
                //  case 'End':
                //      e.preventDefault();
                //      setActiveIndex(filteredOptions.length - 1);
                //      return;
            }
        }
    };

    // =========================================================================
    // VALUES
    // =========================================================================
    const values = {
        id: uniqueInputId,
        internalDate,
        currentDropdownView,
        handleSelectDate,
        setCurrentDropdownView,
        datetime
    };

    // =========================================================================
    // UPDATE INTERNAL INPUT VALUE AND TRIGGER ON CHANGE
    // =========================================================================
    useEffect(() => {
        if (internalRef && internalRef.current) {
            // Calculate Correct Format
            const format = datetime ? 'YYYY-MM-DDThh:mm' : 'YYYY-MM-DD';
            const inputValue = internalDate ? dayjs(internalDate).format(format) : undefined;
            const input = internalRef.current;

            // Update Value of Semantic Input
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            if (setter) setter.call(input, inputValue);

            // Trigger Events
            internalRef.current.dispatchEvent(new Event('change', { bubbles: true }));
            internalRef.current.dispatchEvent(new Event('blur', { bubbles: true }));
        }
    }, [internalDate]);

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <DatePickerContext.Provider value={values}>
            <div className="flex flex-col text-sm w-full ">
                {label && <InputLabel label={label} required={required} htmlFor={uniqueInputId} />}
                {description && <InputDescription description={description} />}

                {/* SEMANTIC CONTAINER */}

                {native && (
                    <input
                        ref={passedRef}
                        type={datetime ? 'datetime-local' : 'date'}
                        {...passThrough}
                        className={`${baseClass} w-full`}
                    />
                )}
                {!native && (
                    <input
                        ref={assignRefs(internalRef, passedRef)}
                        {...passThrough}
                        disabled={disabled || disabledForm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={datetime ? 'datetime-local' : 'date'}
                        className="sr-only"
                        tabIndex={-1}
                    />
                )}

                {/* VISUAL CONTAINER */}
                {!native && (
                    <div className="relative">
                        <div className={baseClass} tabIndex={0} onKeyDown={handleButtonKeyPress} ref={allyRef}>
                            <div onClick={handleInputClick} className="flex flex-1">
                                <input
                                    type="text"
                                    tabIndex={-1}
                                    value={internalDate && dayjs(internalDate).format(displayFormat)}
                                    placeholder={props.placeholder}
                                    className="flex-1 bg-surface bg-opacity-0 outline-none pointer-events-none"
                                    disabled={true}
                                />
                            </div>
                            <div onClick={handleInputClick} className="cursor-pointer">
                                <CalendarIcon />
                            </div>
                        </div>
                        {dropdownOpen && <DatePickerDropdown />}
                    </div>
                )}

                {/* Can Receive Error from prop or from form context */}
                {error && <InputError error={error} />}
                {props.name && formErrors && formErrors[props.name] && <InputError error={formErrors[props.name]} />}
            </div>
        </DatePickerContext.Provider>
    );
});

export default DatePicker;
