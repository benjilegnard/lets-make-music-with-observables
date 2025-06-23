import { FunctionComponent } from 'preact';
import { JSX } from 'preact/jsx-runtime';
import { flavors } from '@catppuccin/palette';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    className?: string;
    style?: JSX.CSSProperties;
}

export const Select: FunctionComponent<SelectProps> = ({
    label,
    value,
    options,
    onChange,
    className,
    style,
}) => {
    const mocha = flavors.mocha.colors;

    const containerStyle: JSX.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontFamily: 'inherit',
        ...style,
    };

    const labelStyle: JSX.CSSProperties = {
        color: mocha.text.hex,
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '4px',
    };

    const selectStyle: JSX.CSSProperties = {
        padding: '8px 12px',
        borderRadius: '4px',
        border: `2px solid ${mocha.blue.hex}`,
        backgroundColor: mocha.crust.hex,
        color: mocha.text.hex,
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        outline: 'none',
        fontFamily: 'inherit',
    };

    const handleChange = (e: JSX.TargetedEvent<HTMLSelectElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <div className={className} style={containerStyle}>
            <label style={labelStyle}>{label}</label>
            <select
                value={value}
                onChange={handleChange}
                style={selectStyle}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};