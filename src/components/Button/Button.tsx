import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useFormContext } from '../Form/Form';
import { Spinner } from '../Common/Spinner';

// =============================================================================
// INTERFACE
// =============================================================================
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    className?: string;
    outlined?: boolean;
    ghost?: boolean;
    loading?: boolean;
    variant?: string;
    icon?: any;
    iconPosition?: 'left' | 'right';
}

// =============================================================================
// CLASSES
// =============================================================================
const base = `
    font-medium 
    rounded-theme-button
    px-4 
    text-sm 
    transition 
    duration-200 
    motion-reduce:transition-none
    disabled:cursor-not-allowed 
    flex 
    items-center 
    gap-2.5
    justify-center
    h-10
`;

const baseGhostButton = `
    ${base} 
    bg-ghost 
    text-ghost-pair 
    hover:bg-ghost-hover 
    disabled:bg-ghost-disabled
`;

const baseButton = (variant: string) => {
    return `
      ${base} 
      bg-${variant} 
      text-${variant}-pair 
      hover:bg-${variant}-hover 
      disabled:bg-${variant}-disabled
    `;
};

const baseOutlineButton = (variant: string) => {
    return `
      ${base} 
      border-2 
      border-${variant} 
      text-${variant} 
      hover:border-${variant}-hover 
      disabled:border-${variant}-disabled 
      disabled:text-${variant}-disabled
    `;
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
    const { disabledForm } = useFormContext();

    const {
        className: passedClassName,
        outlined,
        ghost,
        variant = 'primary',
        icon,
        iconPosition = 'right',
        loading,
        children,
        ...passThrough
    } = props;

    // =========================================================================
    // DETERMINE BUTTON STYLES
    // =========================================================================
    let buttonClass = baseButton(variant || 'primary');
    if (outlined) buttonClass = baseOutlineButton(variant || 'primary');
    if (ghost) buttonClass = baseGhostButton;

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <button
            ref={ref}
            className={overrideTailwindClasses(`${buttonClass} ${passedClassName}`)}
            disabled={props.disabled || disabledForm || loading}
            {...passThrough}
        >
            {icon && iconPosition === 'left' && <IconContainer icon={icon} />}
            {loading || disabledForm ? (
                <div className={`w-4 h-4 fill-${variant}-pair`}>
                    <Spinner />
                </div>
            ) : (
                <div className="flex-1 flex-shrink-1">{children}</div>
            )}
            {icon && iconPosition === 'right' && <IconContainer icon={icon} />}
        </button>
    );
});

const IconContainer = ({ icon }: { icon: any }) => {
    const isJSX = React.isValidElement(icon);

    return isJSX ? (
        icon
    ) : (
        <div className="w-5 h-5 flex items-center justify-center text-inherit">
            {React.createElement(icon, { style: { width: '100%' } })}
        </div>
    );
};

export default Button;
