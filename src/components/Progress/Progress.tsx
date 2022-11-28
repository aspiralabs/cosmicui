import React, { useState } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

interface ProgressProps {
    value?: number;
    min?: number;
    max?: number;
    className?: string;
    variant?: string;
    indeterminate?: boolean;
}

/**
 * Calculates the percentage a number is between two numbers (min & max)
 * @param value
 * @param min
 * @param max
 * @returns
 */
const calculatePercentage = (value: number, min: number, max: number) => {
    if (value < min) return 0;
    if (value > max) return 100;
    return ((value - min) / (max - min)) * 100;
};

const Progress = (props: ProgressProps) => {
    const { value = 50, min = 0, max = 100, className, variant = 'primary', indeterminate = false } = props;
    const percentageValue = calculatePercentage(value, min, max);

    const baseClass = `
        h-full
        bg-${variant}
        rounded-full
        transition-width
        duration-300
    `;

    return (
        <div className={overrideTailwindClasses(`w-full bg-surface rounded-full h-2 overflow-hidden ${className}`)}>
            {!indeterminate && <div className={`${baseClass}`} style={{ width: `${percentageValue}%` }} />}
            {indeterminate && <div className={`${baseClass} w-full animate-indeterminate transform origin-[0%_50%]`} />}
        </div>
    );
};

export default Progress;
