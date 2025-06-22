import { FunctionComponent, ComponentChildren } from 'preact';
import { JSX } from 'preact/jsx-runtime';
import { useState } from 'preact/hooks';
import { flavors } from '@catppuccin/palette';

interface ButtonProps {
    children?: ComponentChildren;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'small' | 'medium' | 'large';
    onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
    onMouseDown?: JSX.MouseEventHandler<HTMLButtonElement>;
    onMouseUp?: JSX.MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: JSX.MouseEventHandler<HTMLButtonElement>;
    style?: JSX.CSSProperties;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export const Button: FunctionComponent<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    style,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    ...props
}) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleMouseDown = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
        setIsPressed(true);
        onMouseDown?.(e);
    };

    const handleMouseUp = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
        setIsPressed(false);
        onMouseUp?.(e);
    };

    const handleMouseLeave = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
        setIsPressed(false);
        setIsActive(false);
        onMouseLeave?.(e);
    };

    const mocha = flavors.mocha.colors;

    const catppuccinColors = {
        primary: {
            color: mocha.blue.hex,
        },
        secondary: {
            color: mocha.overlay2.hex,
        },
        success: {
            color: mocha.green.hex,
        },
        danger: {
            color: mocha.red.hex,
        },
    };

    const sizeStyles = {
        small: {
            padding: '6px 12px',
            fontSize: '14px',
            borderRadius: '26px',
        },
        medium: {
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '36px',
        },
        large: {
            padding: '14px 28px',
            fontSize: '18px',
            borderRadius: '46px',
        },
    };

    const variantColor = catppuccinColors[variant].color;
    const sizes = sizeStyles[size];

    const buttonStyle: JSX.CSSProperties = {
        backgroundColor: isPressed
            ? variantColor
            : isActive
              ? mocha.base.hex
              : mocha.crust.hex,
        color: isPressed ? mocha.crust.hex : variantColor,
        border: `2px solid ${variantColor}`,
        padding: sizes.padding,
        fontSize: sizes.fontSize,
        borderRadius: sizes.borderRadius,
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isPressed ? 'scale(1.2)' : 'scale(1)',
        boxShadow: isPressed
            ? `0 12px 32px ${variantColor}66`
            : `0 6px 16px ${variantColor}33`,
        outline: 'none',
        fontFamily: 'inherit',
        ...style,
    };

    return (
        <button
            {...props}
            style={buttonStyle}
            type="button"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsActive(true)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
        >
            {children}
        </button>
    );
};
