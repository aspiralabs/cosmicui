import React, { forwardRef, InputHTMLAttributes, useRef, useState } from 'react';

interface RangeProps extends InputHTMLAttributes<HTMLInputElement> {}

const Range = forwardRef<HTMLInputElement, RangeProps>((props: RangeProps, ref) => {
    const { ...passThrough } = props;
    const MAX = 100;

    const [internalValue, setInternalValue] = useState(25);

    const handleValueChange = (e: any) => {
        setInternalValue(e.target.value);
    };

    const getBackgroundSize = () => {
        return { backgroundSize: `${(internalValue * 100) / MAX}% 100%` };
    };

    return (
        <input
            type="range"
            className="range-primary"
            min="0"
            max={MAX}
            onChange={handleValueChange}
            style={getBackgroundSize()}
            value={internalValue}
        />
    );
});

export default Range;
// appearance-none bg-transparent cursor-pointer w-32
