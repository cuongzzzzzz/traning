import React from 'react';

type ButtonVariant = 'default' | 'alternative' | 'dark' | 'light' | 'green' | 'red' | 'yellow' | 'purple';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    customClasses?: {
        base?: string;
        variant?: string;
    };
    onClick?: (...args: any[]) => any
    value: string
    type: "submit" | "reset" | "button" | undefined
}

const Button: React.FC<ButtonProps> = ({
    variant = 'default',
    children,
    name,
    className,
    type = "button",
    value = "",
    customClasses,
    ...props
}) => {
    const baseStyles = customClasses?.base || 'focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2';

    const variantStyles: Record<ButtonVariant, string> = {
        default: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        alternative: 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
        dark: 'text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700',
        light: 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
        green: 'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
        red: 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
        yellow: 'text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900',
        purple: 'text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900',
    };

    const variantStyle = customClasses?.variant || variantStyles[variant];
    const buttonStyle = `${baseStyles} ${variantStyle} ${className || ''}`;

    return (
        <button type={type} className={buttonStyle} {...props} >
            {children}
        </button >
    );
};

export default Button;