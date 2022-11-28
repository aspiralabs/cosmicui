import React, { forwardRef, InputHTMLAttributes } from 'react';

interface RangeProps extends InputHTMLAttributes<HTMLInputElement> {}

const Range = forwardRef<HTMLInputElement, RangeProps>((props: RangeProps, ref) => {
    const { ...passThrough } = props;

    return <input ref={ref} {...passThrough} type="range" />;
});

export default Range;
