import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, InputHTMLAttributes, useRef, useState } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import { useFormContext } from '../Form/Form';

// =============================================================================
// INTERFACE
// =============================================================================
export interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
    inputClass?: string;
    label?: string;
    description?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    options: SelectOptionEntry[];
}

export interface InputLabelProps {
    label: string;
    htmlFor: string;
    required?: boolean;
}

export interface SelectOptionEntry {
    label: string;
    value: string;
    render?: JSX.Element;
}

// =============================================================================
// CLASSES
// =============================================================================
const baseClass = `
    bg-surface 
    hover:bg-surface-hover
    focus:bg-surface-hover
    pl-4 
    h-10 
    rounded-theme-input
    text-sm
    placeholder:text-body
    placeholder:text-opacity-50
    text-body
    outline-primary
    relative
    flex
    items-center
`;

const dropdownContainerClass = `
    bg-white 
    border
    border-surface
    rounded-theme-input
    outline-none
    overflow-y-auto
    top-full 
    z-40 
    w-full 
    mt-2
    left-0
    p-1
`;

// =============================================================================
// CONTEXT
// =============================================================================
interface SelectContextObject {
    dropdownOpen: boolean;
    handleOptionClick: (value: any) => void;
    internalValue: SelectOptionEntry | null;
    activeIndex: number;
    uniqueInputId: string;
}

const SelectContext = React.createContext<SelectContextObject>({} as SelectContextObject);
const useSelectContext = () => React.useContext(SelectContext);

// =============================================================================
// RENDER
// =============================================================================

const Select = forwardRef<HTMLSelectElement, InputProps>((props: InputProps, ref) => {
    const uniqueInputId = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(2, 10);

    const { formErrors, disabledForm, inputValidateCallback, validationStrategy } = useFormContext();
    const { label, required, description, onChange, onBlur, disabled, error, options, multiple, ...passThrough } =
        props;

    // =========================================================================
    // STATES
    // =========================================================================
    const [internalValue, setInternalValue] = useState<SelectOptionEntry | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleOptionClick = (value: any) => {
        setInternalValue(getOptionByValue(value));
    };

    const getOptionByValue = (value: any): SelectOptionEntry | null => {
        const option = options.find(option => option.value === value);
        return option ? option : null;
    };

    // =========================================================================
    // KEY PRESS LOGIC
    // =========================================================================
    const handleButtonKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
        if (!dropdownOpen) {
            switch (e.key) {
                case 'Up':
                case 'ArrowUp':
                case 'Down':
                case 'ArrowDown':
                case ' ': // Space
                case 'Enter':
                    e.preventDefault();
                    if (!internalValue) setActiveIndex(0);
                    setDropdownOpen(true);
            }
        }

        if (dropdownOpen) {
            e.persist();
            e.preventDefault();
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    setActiveIndex(activeIndex <= 0 ? options.length - 1 : activeIndex - 1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setActiveIndex(activeIndex + 1 === options.length ? 0 : activeIndex + 1);
                    break;
                case 'Enter':
                case ' ': // Space
                    e.preventDefault();
                    setInternalValue(options[activeIndex]);
                    setDropdownOpen(false);
                    return;
                case 'Esc':
                case 'Escape':
                    e.preventDefault();
                    setDropdownOpen(false);
                    return;
                case 'PageUp':
                case 'Home':
                    e.preventDefault();
                    setActiveIndex(0);
                    return;
                case 'PageDown':
                case 'End':
                    e.preventDefault();
                    setActiveIndex(options.length - 1);
                    return;
            }
        }
    };

    // =========================================================================
    // ACTIONS
    // =========================================================================
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleOnFocus = () => setIsFocused(true);
    const handleInputClick = () => {
        setActiveIndex(-1);
        setDropdownOpen(!dropdownOpen);
    };

    // =========================================================================
    // CONTEXT VALUES
    // =========================================================================
    const values = {
        dropdownOpen,
        handleOptionClick,
        internalValue,
        activeIndex,
        uniqueInputId,
    };

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <SelectContext.Provider value={values}>
            <div className="flex flex-col text-sm w-full">
                {label && <InputLabel label={label} required={required} htmlFor={uniqueInputId} />}
                {description && <InputDescription description={description} />}

                {/* SEMANTIC INPUT CONTAINER */}
                <select
                    ref={ref}
                    {...passThrough}
                    value={internalValue?.value}
                    className="sr-only"
                    onFocus={handleOnFocus}
                    tabIndex={-1}
                    id={uniqueInputId}
                >
                    {options.map(option => (
                        <option value={option.value} />
                    ))}
                </select>

                {/* VISUAL INPUT CONTAINER */}
                <button
                    className={overrideTailwindClasses(`
                        ${baseClass} 
                        focus:outline outline-primary
                    `)}
                    onClick={handleInputClick}
                    aria-haspopup="listbox"
                    aria-controls={`${uniqueInputId}_dropdown`}
                    role="combobox"
                    onKeyDown={handleButtonKeyPress}
                >
                    {/* CONTENT CONTAINER */}
                    <div className="flex-1 flex items-center">
                        {internalValue && <span className="text-body">{internalValue.label}</span>}
                        {!internalValue && <span className="text-body text-opacity-50">{props.placeholder}</span>}
                    </div>

                    {/* OPERATIONAL ICON CONTAINER */}
                    <div className="h-full w-8 flex items-center justify-center">
                        <FontAwesomeIcon
                            onClick={toggleDropdown}
                            icon={faChevronDown}
                            className={`text-normal transform transition motion-reduce:transition-none cursor-pointer ${
                                dropdownOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                    </div>

                    {/* DROPDOWN MENU CONTAINER */}
                    <ul
                        // ref={listRef}
                        role="listbox"
                        id={`${uniqueInputId}_dropdown`}
                        tabIndex={-1}
                        className={overrideTailwindClasses(`
                        ${dropdownContainerClass} 
                        ${dropdownOpen ? 'absolute' : 'hidden'}
                    `)}
                        // aria-labelledby={selectId}
                        style={{ maxHeight: 200 }}
                    >
                        {options.map((option, index) => (
                            <SelectOption option={option} index={index} key={option.value} />
                        ))}
                    </ul>
                </button>

                {/* Can Receive Error from prop or from form context */}
                {error && <InputError error={error} />}
                {props.name && formErrors && formErrors[props.name] && <InputError error={formErrors[props.name]} />}
            </div>
        </SelectContext.Provider>
    );
});

// =============================================================================
// LABEL
// =============================================================================
const InputLabel = ({ label, required, htmlFor }: InputLabelProps) => {
    return (
        <label htmlFor={htmlFor} className="text-theme-input-label text-heading font-bold mb-2">
            {label}
            {required && (
                <span className="text-error" aria-hidden>
                    {' *'}
                </span>
            )}
        </label>
    );
};

const InputDescription = ({ description }: { description: string }) => {
    return <span className="text-theme-input-description text-body mb-1 -mt-3">{description}</span>;
};

const InputError = ({ error }: { error: string }) => {
    return <span className="text-theme-input-description text-error mt-1">{error}</span>;
};

const SelectOption = ({ option, index }: { option: SelectOptionEntry; index: number }) => {
    const { handleOptionClick, internalValue, activeIndex, uniqueInputId } = useSelectContext();
    const isCurrentValue = internalValue?.value === option.value || activeIndex === index;

    return (
        <li
            className="group"
            onClick={() => handleOptionClick(option.value)}
            id={`${uniqueInputId}_element_${option.value}`}
            aria-selected={internalValue?.value === option.value}
            role="option"
        >
            <div
                className={`px-2 py-1.5 rounded cursor-pointer mt-1  group-hover:bg-surface text-body text-left ${
                    isCurrentValue && 'bg-surface'
                }`}
            >
                {option.label}
            </div>
        </li>
    );
};
// =============================================================================
// EXPORT
// =============================================================================
export default Select;
