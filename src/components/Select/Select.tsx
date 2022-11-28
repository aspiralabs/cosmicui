import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, HTMLAttributes, InputHTMLAttributes, useRef, useState } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import { InputLabel, InputDescription, InputError } from '../Common/InputPieces';
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
    searchable?: boolean;
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

const ChevronDown = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 stroke-2">
            <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clipRule="evenodd"
            />
        </svg>
    );
};

// =============================================================================
// CLASSES
// =============================================================================
const baseClass = `input pl-4 pr-0`;

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

const searchableContainerClass = `
    bg-primary
    absolute
    h-inherit
    w-full
    bg-opacity-0
    outline-none
    text-left
    pointer-events-none
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
    const { label, required, description, onChange, onBlur, disabled, error, options, searchable, ...passThrough } =
        props;

    const searchBoxRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // =========================================================================
    // STATES
    // =========================================================================
    const [internalValue, setInternalValue] = useState<SelectOptionEntry | null>(null);
    const [internalSearchValue, setInternalSearchValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<SelectOptionEntry[]>(options);

    const handleOptionClick = (value: any) => {
        selectOption(getOptionByValue(value));
    };

    const getOptionByValue = (value: any): SelectOptionEntry | null => {
        const option = options.find(option => option.value === value);
        return option ? option : null;
    };

    const selectOption = (option: SelectOptionEntry | null) => {
        buttonRef?.current?.focus();
        if (option) setInternalValue(option);
        setInternalSearchValue('');
        setActiveIndex(0);
        setDropdownOpen(false);
        setIsSearching(false);
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
                    if (searchable) searchBoxRef.current?.focus();

                    setDropdownOpen(true);

                    if (!dropdownOpen) setIsSearching(true);
                    if (dropdownOpen) setIsSearching(false);
            }
        }

        if (dropdownOpen) {
            e.persist();

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    setActiveIndex(activeIndex <= 0 ? filteredOptions.length - 1 : activeIndex - 1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setActiveIndex(activeIndex + 1 === filteredOptions.length ? 0 : activeIndex + 1);
                    break;
                case 'Enter':
                    e.preventDefault();
                    selectOption(filteredOptions[activeIndex]);
                    return;
                case 'Esc':
                case 'Escape':
                    e.preventDefault();
                    selectOption(null);
                    return;
                case 'PageUp':
                case 'Home':
                    e.preventDefault();
                    setActiveIndex(0);
                    return;
                case 'PageDown':
                case 'End':
                    e.preventDefault();
                    setActiveIndex(filteredOptions.length - 1);
                    return;
            }
        }
    };

    const handleInternalSearchChange = (e: any) => {
        const text = e.target.value;
        const newFilteredOptions = options.filter(option =>
            option.label.toLowerCase().includes(text.toLowerCase().trim())
        );

        setInternalSearchValue(text);
        setFilteredOptions(newFilteredOptions);
        setActiveIndex(0);
    };

    // =========================================================================
    // ACTIONS
    // =========================================================================
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleOnFocus = () => {
        setIsFocused(true);
    };

    const handleInputClick = () => {
        setActiveIndex(-1);
        setDropdownOpen(!dropdownOpen);

        if (!dropdownOpen) setIsSearching(true);
        if (dropdownOpen) setIsSearching(false);

        setInternalSearchValue('');
        searchBoxRef && !dropdownOpen && searchBoxRef.current?.focus();
    };

    const generateDisplayedValue = () => {
        console.log(searchable, isSearching, internalValue);

        if (searchable && !isSearching) {
            if (internalValue) return <span className="text-body">{internalValue.label}</span>;
            if (!internalValue) return <span className="text-body text-opacity-50">{props.placeholder}</span>;
        }
        if (!searchable) {
            if (internalValue) return <span className="text-body">{internalValue.label}</span>;
            if (!internalValue) <span className="text-body text-opacity-50">{props.placeholder}</span>;
        }

        return <span></span>;
    };

    // =========================================================================
    // CONTEXT VALUES
    // =========================================================================
    const values = {
        dropdownOpen,
        handleOptionClick,
        internalValue,
        activeIndex,
        uniqueInputId
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
                    multiple={false}
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
                    ref={buttonRef}
                    tabIndex={0}
                >
                    {/* CONTENT CONTAINER */}
                    <div className="flex-1 flex items-center relative">
                        {React.createElement(generateDisplayedValue)}
                        <input
                            ref={searchBoxRef}
                            value={internalSearchValue}
                            onChange={handleInternalSearchChange}
                            className={searchableContainerClass}
                            tabIndex={-1}
                        />
                    </div>
                    {/* OPERATIONAL ICON CONTAINER */}
                    <div
                        onClick={toggleDropdown}
                        className={`h-full w-8 flex items-center justify-center text-normal transform transition motion-reduce:transition-none cursor-pointer ${
                            dropdownOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                    >
                        <ChevronDown />
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
                        {filteredOptions.map((option, index) => (
                            <SelectOption option={option} index={index} key={option.value} />
                        ))}

                        {filteredOptions.length === 0 && (
                            <p className="text-center text-inherit p-2">No Results Found!</p>
                        )}
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
// OPTIONS
// =============================================================================
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
