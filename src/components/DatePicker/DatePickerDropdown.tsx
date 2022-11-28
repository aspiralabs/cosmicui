// =============================================================================
// DROPDOWN
// =============================================================================

import React, { useState, useEffect } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import { useDatePicker } from './DatePicker';
import dayjs from 'dayjs';
import Input from '../Input';

interface DayObject {
    day: number;
    type: 'outside_current_month' | 'selected' | 'past' | 'current' | 'future';
}

interface DatePickerViewObject {
    daysInMonth: DayObject[];
    month: number;
    year: number;
    hour: number;
    minute: number;
}
// =============================================================================
// ICONS
// =============================================================================
const chevronContainer = `
    cursor-pointer 
    duration-100 
    ease-in-out 
    flex 
    h-6 
    items-center 
    justify-center 
    p-1 
    rounded-full 
    text-body 
    dark:text-body-dark 
    text-sm 
    transition 
    w-6 
    hover:bg-surface 
    dark:hover:bg-surface-dark
`;

const ChevronLeft = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clipRule="evenodd"
            />
        </svg>
    );
};

const ChevronRight = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                clipRule="evenodd"
            />
        </svg>
    );
};

const ChevronUp = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
                fillRule="evenodd"
                d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                clipRule="evenodd"
            />
        </svg>
    );
};

const ChevronDown = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clipRule="evenodd"
            />
        </svg>
    );
};

// =============================================================================
// MAIN
// =============================================================================
export const DatePickerDropdown = () => {
    const { currentDropdownView, setCurrentDropdownView, internalDate, handleSelectDate, datetime } = useDatePicker();

    const [yearPickerIndex, setYearPickerIndex] = useState(0);
    const [currentAllyDateSelected, setCurrentAllyDateSelected] = useState(0);

    // The current
    const [currentViewDate, setCurrentViewDate] = useState<DatePickerViewObject>({
        daysInMonth: [],
        month: 0,
        year: 0,
        hour: 0,
        minute: 0
    });

    const allDateRefs: { [key: number]: any } = {};

    // =========================================================================
    // ACTIONS
    // =========================================================================
    const initiateDropdown = () => {
        let payload: DatePickerViewObject = { ...currentViewDate };
        if (internalDate) {
            payload = {
                daysInMonth: [],
                year: internalDate.getFullYear(),
                month: internalDate.getMonth(),
                hour: internalDate.getHours(),
                minute: internalDate.getMinutes()
            };
        } else {
            const today = new Date();
            payload = {
                daysInMonth: [],
                year: today.getFullYear(),
                month: today.getMonth(),
                hour: today.getHours(),
                minute: today.getMinutes()
            };
        }

        const finalPayload = { ...payload, daysInMonth: getDaysOfCurrentMonth(payload) };
        setCurrentViewDate(finalPayload);

        // Calculate Values for Ally
        const hasSelected = finalPayload.daysInMonth.find(day => day.type === 'selected');
        const currentDate = finalPayload.daysInMonth.find(day => day.type === 'current');
        setCurrentAllyDateSelected((hasSelected ? hasSelected.day : currentDate?.day) || 0);
    };

    const getDaysOfCurrentMonth = (payload: DatePickerViewObject) => {
        const daysInMonth = new Date(payload.year, payload.month + 1, 0).getDate();

        // find where to start calendar day of week
        const dayOfWeek = new Date(payload.year, payload.month).getDay();
        const blankdaysArray: DayObject[] = [];
        for (let i = 1; i <= dayOfWeek; i++) {
            blankdaysArray.push({ day: i * -1, type: 'outside_current_month' });
        }

        const daysArray: DayObject[] = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const entry: DayObject = { day: i, type: determineDayColor(i, payload) };
            daysArray.push(entry);
        }

        const finalArray: DayObject[] = [...blankdaysArray, ...daysArray];
        return finalArray;
    };

    const determineDayColor = (day: number, viewDate: DatePickerViewObject) => {
        const today = new Date();
        const compareDate = new Date(viewDate.year, viewDate.month, day);

        if (internalDate && internalDate.toDateString() === compareDate.toDateString()) return 'selected';
        if (today.toDateString() === compareDate.toDateString()) return 'current';
        if (today.getTime() > compareDate.getTime()) return 'past';
        return 'future';
    };

    const updateCalendarView = (payload: DatePickerViewObject) => {
        const finalPayload = { ...payload, daysInMonth: getDaysOfCurrentMonth(payload) };
        setCurrentViewDate(finalPayload);
    };

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleMoveBackOneMonth = () => {
        const newMonth = currentViewDate.month - 1;
        if (newMonth === -1) {
            let payload: DatePickerViewObject = { ...currentViewDate, month: 11, year: currentViewDate.year - 1 };
            updateCalendarView(payload);
        } else {
            let payload: DatePickerViewObject = { ...currentViewDate, month: newMonth };
            updateCalendarView(payload);
        }
    };

    const handleMoveForwardOneMonth = () => {
        const newMonth = currentViewDate.month + 1;
        if (newMonth === 12) {
            let payload: DatePickerViewObject = { ...currentViewDate, month: 0, year: currentViewDate.year + 1 };
            updateCalendarView(payload);
        } else {
            let payload: DatePickerViewObject = { ...currentViewDate, month: newMonth };
            updateCalendarView(payload);
        }
    };

    const handleDateClick = (day: number) => {
        if (datetime) {
            const selectedDate = new Date(
                currentViewDate.year,
                currentViewDate.month,
                day,
                currentViewDate.hour,
                currentViewDate.minute
            );
            handleSelectDate(selectedDate);
        } else {
            const selectedDate = new Date(currentViewDate.year, currentViewDate.month, day);
            handleSelectDate(selectedDate);
        }
    };

    const toggleMonthPicker = () => {
        if (currentDropdownView === 'month_picker') setCurrentDropdownView('picker');
        else setCurrentDropdownView('month_picker');
    };

    const toggleYearPicker = () => {
        if (currentDropdownView === 'year_picker') setCurrentDropdownView('picker');
        else {
            // Find index where current year is
            const index = YEARS_ARRAY.findIndex((decade: any) => {
                return decade.find((year: any) => year.value === currentViewDate.year);
            });
            setYearPickerIndex(index);
            setCurrentDropdownView('year_picker');
        }
    };

    const handleMonthClick = (month: number) => {
        updateCalendarView({ ...currentViewDate, month });
        setCurrentDropdownView('picker');
    };

    const handleGoPreviousDecade = () => {
        if (yearPickerIndex === 0) return;
        else setYearPickerIndex(yearPickerIndex - 1);
    };

    const handleGoNextDecade = () => {
        if (yearPickerIndex === YEARS_ARRAY.length - 1) return;
        else setYearPickerIndex(yearPickerIndex + 1);
    };

    const handleYearClick = (year: number) => {
        updateCalendarView({ ...currentViewDate, year });
        setCurrentDropdownView('picker');
    };

    const updateHour = (hour: number) => {
        updateCalendarView({ ...currentViewDate, hour });
    };

    const updateMinute = (minute: number) => {
        updateCalendarView({ ...currentViewDate, minute });
    };

    // =========================================================================
    // CLASSES
    // =========================================================================
    const monthButtonClasses = `text-sm transition py-2 rounded-md text-body dark:text-body-dark font-semibold hover:bg-surface-hover  cursor-pointer`;
    const monthActiveClass = 'text-white bg-primary dark:text-white';

    const yearButtonClasses = `text-sm transition py-2 rounded-md text-body dark:text-body-dark font-semibold bg-surface dark:bg-card-dark hover:bg-surface-hover cursor-pointer`;
    const yearButtonActiveClass = 'text-white bg-primary dark:text-white dark:bg-primary';
    const yearButtonDisabledClasses = `text-sm py-2 rounded-md text-body-light cursor-not-allowed `;

    const dayBaseClass = `cursor-pointer rounded-full w-6 h-6 text-center text-sm  flex items-center justify-center`;
    const daySelectedClass = 'bg-primary text-white';
    const dayCurrentClass = 'bg-surface text-body hover:bg-primary hover:text-white';
    const dayPastClass = 'text-body text-opacity-75 hover:bg-primary hover:text-white hover:text-opacity-100';
    const dayFutureClass = 'text-body hover:bg-primary hover:text-white dark:text-body-dark';

    // =========================================================================
    // KEY ACTIONS
    // =========================================================================
    const handleButtonKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
        console.log(e.key);
        const lastPossibleIndex = currentViewDate.daysInMonth[currentViewDate.daysInMonth.length - 1].day;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (currentAllyDateSelected === 1) break;
                allDateRefs[currentAllyDateSelected - 1].focus();
                setCurrentAllyDateSelected(currentAllyDateSelected - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (currentAllyDateSelected === lastPossibleIndex) break;
                setCurrentAllyDateSelected(currentAllyDateSelected + 1);
                allDateRefs[currentAllyDateSelected + 1].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentAllyDateSelected - 7 < 1) break;
                allDateRefs[currentAllyDateSelected - 7].focus();
                setCurrentAllyDateSelected(currentAllyDateSelected - 7);
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (currentAllyDateSelected + 7 > lastPossibleIndex) break;
                setCurrentAllyDateSelected(currentAllyDateSelected + 7);
                allDateRefs[currentAllyDateSelected + 7].focus();
                break;
        }
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => initiateDropdown(), []);

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <div className="bg-white shadow p-4 absolute top-full left-0 w-72 z-50">
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
                            <button type="button" className={chevronContainer} onClick={handleMoveBackOneMonth}>
                                <ChevronLeft />
                            </button>
                            <button type="button" className={chevronContainer} onClick={handleMoveForwardOneMonth}>
                                <ChevronRight />
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
                    <div className="-mx-1 flex flex-wrap ">
                        {currentViewDate.daysInMonth.map(day => {
                            return (
                                <button
                                    key={day.day}
                                    style={{ width: ' 14.28%' }}
                                    className="flex items-center justify-center mb-1 px-1"
                                    tabIndex={currentAllyDateSelected === day.day ? 0 : -1}
                                    onKeyDown={handleButtonKeyPress}
                                    onClick={() => handleDateClick(day.day)}
                                    ref={ref => (allDateRefs[day.day] = ref)}
                                >
                                    <div
                                        onClick={() => handleDateClick(day.day)}
                                        className={`
                                                ${dayBaseClass} 
                                                ${day.type === 'selected' && daySelectedClass}
                                                ${day.type === 'past' && dayPastClass}
                                                ${day.type === 'current' && dayCurrentClass}
                                                ${day.type === 'future' && dayFutureClass}
                                            `}
                                    >
                                        {day.type !== 'outside_current_month' && day.day}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {datetime && (
                        <React.Fragment>
                            <div className="w-full h-px my-4 bg-body bg-opacity-20" />
                            <section className="mt-2">
                                <div className="flex justify-center items-center">
                                    <NumberPicker
                                        min={0}
                                        max={24}
                                        number={currentViewDate.hour}
                                        setNumber={value => updateHour(value)}
                                    />
                                    <span className="font-bold mx-2 text-xl text-body">:</span>
                                    <NumberPicker
                                        min={0}
                                        max={59}
                                        number={currentViewDate.minute}
                                        setNumber={value => updateMinute(value)}
                                    />
                                </div>
                            </section>
                        </React.Fragment>
                    )}
                </div>
            )}

            {currentDropdownView === 'month_picker' && (
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
                        </div>
                    </div>

                    <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                        {MONTHS.map((month, index) => {
                            if (currentViewDate.month === index) {
                                return (
                                    <button
                                        key={index}
                                        className={overrideTailwindClasses(`${monthButtonClasses} ${monthActiveClass}`)}
                                    >
                                        {month}
                                    </button>
                                );
                            } else {
                                return (
                                    <button
                                        key={index}
                                        className={monthButtonClasses}
                                        onClick={() => handleMonthClick(index)}
                                    >
                                        {month}
                                    </button>
                                );
                            }
                        })}
                    </div>
                </div>
            )}

            {currentDropdownView === 'year_picker' && (
                <div className="h-full w-full">
                    {/* TOP PART OF CALENDAR PICKER */}
                    <div className="flex flex-col  justify-between mb-2">
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={() => handleGoPreviousDecade()} className={yearButtonClasses}>
                                <ChevronLeft />
                            </button>
                            <span
                                className="font-normal ml-1 text-heading dark:text-heading-dark text-lg cursor-pointer"
                                onClick={toggleYearPicker}
                            >
                                {YEARS_ARRAY[yearPickerIndex][0].value} - {YEARS_ARRAY[yearPickerIndex][9].value}
                            </span>
                            <button onClick={() => handleGoNextDecade()} className={yearButtonClasses}>
                                <ChevronRight />
                            </button>
                        </div>

                        <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                            {YEARS_ARRAY[yearPickerIndex].map((year: any) => {
                                if (year.value === currentViewDate.year) {
                                    return (
                                        <button
                                            className={overrideTailwindClasses(
                                                `${yearButtonClasses} ${yearButtonActiveClass}`
                                            )}
                                            key={year.value}
                                            onClick={() => handleYearClick(year.value)}
                                        >
                                            {year.value}
                                        </button>
                                    );
                                }

                                if (year.disabled) {
                                    return (
                                        <button className={yearButtonDisabledClasses} disabled key={year.value}>
                                            {year.value}
                                        </button>
                                    );
                                }

                                return (
                                    <button
                                        className={yearButtonClasses}
                                        key={year.value}
                                        onClick={() => handleYearClick(year.value)}
                                    >
                                        {year.value}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// =============================================================================
// CONSTS
// =============================================================================
// =============================================================================
// ADDITIONAL COMPONENTS
// =============================================================================
const NumberPicker = ({
    min,
    max,
    number,
    setNumber
}: {
    min: number;
    max: number;
    number: number;
    setNumber: (value: number) => void;
}) => {
    const handleInputChange = (e: any) => {
        setNumber(e.target.value);
    };

    const handleTimeUp = () => {
        const newValue = number + 1;
        setNumber(newValue > max ? min : newValue);
    };

    const handleTimeDown = () => {
        const newValue = number - 1;
        setNumber(newValue < min ? max : newValue);
    };

    const pad = (number: number) => {
        var s = String(number);
        while (s.length < 2) {
            s = '0' + s;
        }
        return s;
    };

    return (
        <div className="flex flex-col flex-0 items-center gap-1">
            <div onClick={handleTimeUp} className={chevronContainer}>
                <ChevronUp />
            </div>
            {/* <input
                className="border-2 border-gray dark:border-gray-dark p-2 rounded w-12 text-center text-body dark:text-body-dark"
                value={pad(number)}
                onChange={handleInputChange}
                style={{ background: 'rgba(0,0,0,0)' }}
            /> */}

            <div className="w-12">
                <Input value={pad(number)} onChange={handleInputChange} />
            </div>
            <div onClick={handleTimeDown} className={chevronContainer}>
                <ChevronDown />
            </div>
        </div>
    );
};

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
