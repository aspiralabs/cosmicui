import React, { useEffect, useState } from 'react';
import DatePicker from './DatePicker';

export default {
    title: 'DatePicker'
};

export const BasicDatePicker = () => {
    const [date, setDate] = useState<string>('');

    useEffect(() => console.log('date', date), [date]);

    return (
        <div className="flex flex-col gap-4">
            <DatePicker
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="Placeholder Text"
                label="Birthday"
                description="Some Nice Description"
            />

            <DatePicker
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="Placeholder Text"
                label="Birthday"
                description="Some Nice Description"
                datetime
            />

            <DatePicker label="Native Birthday" description="Some Nice Description" native />
        </div>
    );
};
