import React, { forwardRef, InputHTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import { InputLabel, InputDescription, InputError } from '../Common/InputPieces';
import { useFormContext } from '../Form/Form';
import dayjs from 'dayjs';

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
}

interface DatePickerContextValues {
    id: string;
    internalDate: Date;
    currentDropdownView: string;
}

// =============================================================================
// ICONS
// =============================================================================
const CalendarIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-icon">
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

const DatePicker = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    const { formErrors, disabledForm, inputValidateCallback, validationStrategy } = useFormContext();
    const { inputClass, label, required, description, onChange, onBlur, disabled, error, ...passThrough } = props;
    const uniqueInputId = '1';

    // =========================================================================
    // LOCAL STATES
    // =========================================================================
    const [internalDate, setInternalDate] = useState<Date>(new Date());
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
    // =========================================================================
    // VALUES
    // =========================================================================
    const values = {
        id: uniqueInputId,
        internalDate,
        currentDropdownView
    };
    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <DatePickerContext.Provider value={values}>
            <div className="flex flex-col text-sm w-full">
                {label && <InputLabel label={label} required={required} htmlFor={uniqueInputId} />}
                {description && <InputDescription description={description} />}

                {/* SEMANTIC CONTAINER */}
                <input
                    ref={ref}
                    {...passThrough}
                    disabled={disabled || disabledForm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="date"
                    className="sr-only"
                    tabIndex={-1}
                />

                {/* VISUAL CONTAINER */}
                <div className={baseClass}>
                    <div className="flex-1" onClick={handleInputClick}>
                        <p className="text-inherit">{dayjs(internalDate).format('MM/DD/YYYY')}</p>
                    </div>
                    <CalendarIcon />
                    {dropdownOpen && <DatePickerDropdown />}
                </div>

                {/* Can Receive Error from prop or from form context */}
                {error && <InputError error={error} />}
                {props.name && formErrors && formErrors[props.name] && <InputError error={formErrors[props.name]} />}
            </div>
        </DatePickerContext.Provider>
    );
});

// =============================================================================
// DROPDOWN
// =============================================================================
interface MonthDayObject {
    blank: number[];
    available: number[];
}

interface DatePickerViewObject {
    month: number;
    year: number;
    hour: number;
    minute: number;
}

const DatePickerDropdown = () => {
    const { currentDropdownView, internalDate } = useDatePicker();

    const [currentMonthDays, setCurrentMonthDays] = useState<MonthDayObject>({
        blank: [],
        available: []
    });

    const [currentViewDate, setCurrentViewDate] = useState<DatePickerViewObject>({
        month: 0,
        year: 0,
        hour: 0,
        minute: 0
    });

    // =========================================================================
    // ACTIONS
    // =========================================================================
    const initiateDropdown = () => {
        let payload: DatePickerViewObject = { ...currentViewDate };
        if (internalDate) {
            payload = {
                year: internalDate.getFullYear(),
                month: internalDate.getMonth(),
                hour: internalDate.getHours(),
                minute: internalDate.getMinutes()
            };
        } else {
            const today = new Date();
            payload = {
                year: today.getFullYear(),
                month: today.getMonth(),
                hour: today.getHours(),
                minute: today.getMinutes()
            };
        }

        getDaysOfCurrentMonth(payload);
        setCurrentViewDate(payload);
    };

    const getDaysOfCurrentMonth = (currentViewObject: any) => {
        const daysInMonth = new Date(currentViewObject.year, currentViewObject.month + 1, 0).getDate();

        // find where to start calendar day of week
        const dayOfWeek = new Date(currentViewObject.year, currentViewObject.month).getDay();
        const blankdaysArray = [];
        for (let i = 1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
        }

        const daysArray = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        setCurrentMonthDays({
            blank: blankdaysArray,
            available: daysArray
        });

        setCurrentViewDate(currentViewObject);
    };

    const determineDayColor = (day: number) => {
        const today = new Date();
        const compareDate = new Date(currentViewDate.year, currentViewDate.month, day);

        // If date has been a selected date
        if (internalDate && internalDate.toDateString() === compareDate.toDateString()) {
            return 'bg-primary text-white';
        }

        // if date is today
        if (today.toDateString() === compareDate.toDateString()) {
            return 'bg-surface text-body hover:bg-primary hover:text-white';
        }

        // Past Date
        if (today.getTime() > compareDate.getTime()) {
            return 'text-body text-opacity-75 hover:bg-primary hover:text-white hover:text-opacity-100';
        }

        return 'text-body hover:bg-primary hover:text-white dark:text-body-dark';
    };

    const updatePickerView = (payload: DatePickerViewObject) => {
        getDaysOfCurrentMonth(payload);
    };

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleMoveBackOneMonth = () => {
        const newMonth = currentViewDate.month - 1;
        if (newMonth === -1) {
            let payload: DatePickerViewObject = { ...currentViewDate, month: 11, year: currentViewDate.year - 1 };
            updatePickerView(payload);
        } else {
            let payload: DatePickerViewObject = { ...currentViewDate, month: newMonth };
            updatePickerView(payload);
        }
    };

    const handleMoveForwardOneMonth = () => {
        const newMonth = currentViewDate.month + 1;
        if (newMonth === 12) {
            let payload: DatePickerViewObject = { ...currentViewDate, month: 0, year: currentViewDate.year + 1 };
            updatePickerView(payload);
        } else {
            let payload: DatePickerViewObject = { ...currentViewDate, month: newMonth };
            updatePickerView(payload);
        }
    };

    const handleDateClick = (day: number) => {
        // const selectedDate = new Date(currentYear, currentMonth, day);
        // handleSelectDate(selectedDate, !datetime);
    };

    const toggleMonthPicker = () => {
        // if (currentDropdownView === 'month_picker') setCurrentView('picker');
        // else setCurrentView('month_picker');
    };

    const toggleYearPicker = () => {
        // if (currentView === 'year_picker') setCurrentView('picker');
        // else {
        //     // Find index where current year is
        //     const index = YEARS_ARRAY.findIndex(decade => {
        //         return decade.find(year => year.value === currentYear);
        //     });
        //     setYearPickerIndex(index);
        //     setCurrentView('year_picker');
        // }
    };

    const handleMonthClick = (month: number) => {
        // const newDate = moment(innerValue).set('month', month).toDate();
        // handleSelectDate(newDate);
        // setCurrentView('picker');
    };

    const handleGoPreviousDecade = () => {
        // if (yearPickerIndex === 0) return;
        // else setYearPickerIndex(yearPickerIndex - 1);
    };

    const handleGoNextDecade = () => {
        // if (yearPickerIndex === YEARS_ARRAY.length - 1) return;
        // else setYearPickerIndex(yearPickerIndex + 1);
    };

    const handleYearClick = (year: number) => {
        // const newDate = moment(innerValue).set('year', year).toDate();
        // handleSelectDate(newDate);
        // setCurrentView('picker');
    };

    const monthButtonClasses = `text-sm transition py-2 rounded-md text-body dark:text-body-dark font-semibold hover:bg-surface-hover  cursor-pointer`;
    const monthActiveClass = 'text-white bg-primary dark:text-white';

    const yearButtonClasses = `text-sm transition py-2 rounded-md text-body dark:text-body-dark font-semibold bg-surface dark:bg-card-dark hover:bg-surface-hover cursor-pointer`;
    const yearButtonActiveClass = 'text-white bg-primary dark:text-white dark:bg-primary';
    const yearButtonDisabledClasses = `text-sm py-2 rounded-md text-body-light cursor-not-allowed `;

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => initiateDropdown(), []);

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <div className="bg-white shadow p-4 absolute top-full left-0 w-72">
            {currentDropdownView === 'picker' && (
                <div className="h-full w-full">
                    {/* TOP PART OF CALENDAR PICKER */}
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <span
                                onClick={toggleMonthPicker}
                                className="font-bold text-heading dark:text-heading-dark text-lg cursor-pointer"
                            >
                                {MONTH_NAMES[currentViewDate.month]}
                            </span>
                            <span
                                onClick={toggleYearPicker}
                                className="font-normal ml-1 text-heading dark:text-heading-dark text-lg cursor-pointer"
                            >
                                {currentViewDate.year}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="cursor-pointer duration-100 ease-in-out flex h-6 items-center justify-center p-1 rounded-full text-body dark:text-body-dark text-sm transition w-6 hover:bg-surface dark:hover:bg-surface-dark"
                                onClick={handleMoveBackOneMonth}
                            >
                                {/* CHEVRON LEFT */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="cursor-pointer duration-100 ease-in-out flex h-6 items-center justify-center p-1 rounded-full text-body dark:text-body-dark text-sm transition w-6 hover:bg-surface"
                                onClick={handleMoveForwardOneMonth}
                            >
                                {/* CHEVRON RIGHT */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* DAY SECTION */}
                    <div className="-mx-1 flex flex-wrap mb-3">
                        {DAYS.map(day => {
                            return (
                                <div style={{ width: ' 14.26%' }} className="px-1" key={day}>
                                    <div className="font-medium text-center text-heading text-xs">{day}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/*  DATE NUMBER SECTION */}
                    <div className="-mx-1 flex flex-wrap">
                        {currentMonthDays.blank.map(day => (
                            <div key={day} style={{ width: ' 14.28%' }} className="p-1 text-center text-sm" />
                        ))}
                        {currentMonthDays.available.map(day => {
                            return (
                                <div
                                    key={day}
                                    style={{ width: ' 14.28%' }}
                                    className="flex items-center justify-center mb-1 px-1"
                                >
                                    <div
                                        onClick={() => handleDateClick(day)}
                                        className={`cursor-pointer duration-100 ease-in-out rounded-full w-6 h-6 text-center text-sm transition flex items-center justify-center ${determineDayColor(
                                            day
                                        )}`}
                                    >
                                        {day}
                                    </div>
                                </div>
                            );
                        })}{' '}
                    </div>

                    {/* {datetime && (
                        <React.Fragment>
                            <div className="w-full h-px my-4 bg-gray dark:bg-gray-dark" />
                            <section className="mt-2">
                                <div className="flex justify-center items-center">
                                    <NumberPicker
                                        min={0}
                                        max={24}
                                        number={currentHour}
                                        setNumber={value => updateHour(value)}
                                    />
                                    <span className="font-bold mx-2 text-xl">:</span>
                                    <NumberPicker
                                        min={0}
                                        max={60}
                                        number={currentMinute}
                                        setNumber={value => updateMinute(value)}
                                    />
                                </div>
                            </section>
                        </React.Fragment>
                    )} */}
                </div>
            )}
        </div>
    );
};

// =============================================================================
// YEET
// =============================================================================
const generateArray = (start: number, end: number) => {
    const filledArray = new Array(end - start + 1).fill({}).map((_, idx) => ({ value: start + idx, disabled: false }));

    // Add Start Padding
    const startPadding = start % 10;
    for (let i = startPadding; i > 0; i--) {
        filledArray.unshift({
            disabled: true,
            value: filledArray[0].value - 1
        });
    }

    // Add End Padding
    const endPadding = end % 10;
    for (let i = 0; i < endPadding - 1; i++) {
        filledArray.push({ disabled: true, value: filledArray[filledArray.length - 1].value + 1 });
    }

    return filledArray.reduce((resultArray: any, item, index) => {
        const chunkIndex = Math.floor(index / 10);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
    }, []);
};

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS_ARRAY = generateArray(1943, 2045);

export default DatePicker;
