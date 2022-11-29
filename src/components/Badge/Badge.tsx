import React from 'react';

interface BadgeProps {
    children: any;
    variant?: string;
    className?: string;
    indicator?: boolean;
    closeable?: boolean;
    onClose?: () => void;
}

const Badge = (props: BadgeProps) => {
    const { variant = 'primary', closeable = false } = props;

    const baseClass = `badge-${variant} ${closeable ? 'pl-3 pr-2' : 'px-3'}`;

    const closeButtonClass = `
        flex-shrink-0 
        h-4 
        w-4 
        inline-flex 
        items-center 
        justify-center 
        rounded-full 
        text-${variant}-pair
        hover:bg-${variant}-hover
        focus:outline-none 
    `;

    const handleCloseClick = () => {
        props.onClose && props.onClose();
    };

    return (
        <span className={`${baseClass} ${props.className}`}>
            {props.children}
            {closeable && (
                <button type="button" className={closeButtonClass} onClick={handleCloseClick}>
                    <span className="sr-only">Remove badge</span>
                    <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            )}
        </span>
    );
};

export default Badge;
