import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { useFormContext } from '../Form/Form';
import { Spinner } from '../Common/Spinner';

// =============================================================================
// INTERFACE
// =============================================================================
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    className?: string;
    outlined?: boolean;
    loading?: boolean;
    variant?: string;
    icon?: any;
    iconPosition?: 'left' | 'right';
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
    const { disabledForm } = useFormContext();

    const {
        className: passedClassName,
        outlined = false,
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
    let buttonClass = outlined ? `btn-${variant}-outlined` : `btn-${variant}`;

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <button
            ref={ref}
            className={`${buttonClass} ${passedClassName}`}
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
