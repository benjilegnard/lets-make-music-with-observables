import { FunctionComponent } from 'preact';
import { JSX } from 'preact/jsx-runtime';
import { useState } from 'preact/hooks';
import { flavors } from '@catppuccin/palette';

interface SliderProps {
    label: string;
    min: number;
    max: number;
    step?: number;
    value?: number;
    onChange: (value: number) => void;
    className?: string;
    style?: JSX.CSSProperties;
}

export const Slider: FunctionComponent<SliderProps> = ({
    label,
    min,
    max,
    step = 1,
    value = min,
    onChange,
    className,
    style,
}) => {
    const [isActive, setIsActive] = useState(false);
    const mocha = flavors.mocha.colors;

    const variantColor = mocha.blue.hex;

    const handleChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.currentTarget.value);
        onChange(newValue);
    };

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

    const sliderStyle: JSX.CSSProperties = {
        appearance: 'none',
        width: '100%',
        height: '8px',
        borderRadius: '4px',
        background: `linear-gradient(to right, ${variantColor} 0%, ${variantColor} ${((value - min) / (max - min)) * 100}%, ${mocha.surface0.hex} ${((value - min) / (max - min)) * 100}%, ${mocha.surface0.hex} 100%)`,
        outline: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    };

    const thumbStyle = `
        input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: ${isActive ? variantColor : mocha.crust.hex};
            border: 2px solid ${variantColor};
            cursor: pointer;
            transition: all 0.2s ease;
            transform: ${isActive ? 'scale(1.2)' : 'scale(1)'};
            box-shadow: ${isActive ? `0 6px 16px ${variantColor}66` : `0 3px 8px ${variantColor}33`};
        }
        
        input[type="range"]::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: ${isActive ? variantColor : mocha.crust.hex};
            border: 2px solid ${variantColor};
            cursor: pointer;
            transition: all 0.2s ease;
            transform: ${isActive ? 'scale(1.2)' : 'scale(1)'};
            box-shadow: ${isActive ? `0 6px 16px ${variantColor}66` : `0 3px 8px ${variantColor}33`};
            border: none;
        }
    `;

    const outputStyle: JSX.CSSProperties = {
        color: variantColor,
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'center',
        minWidth: '60px',
        padding: '4px 8px',
        backgroundColor: mocha.surface0.hex,
        borderRadius: '12px',
        border: `1px solid ${variantColor}33`,
    };

    return (
        <div className={className} style={containerStyle}>
            <style dangerouslySetInnerHTML={{ __html: thumbStyle }} />
            <label style={labelStyle}>{label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                    style={sliderStyle}
                />
                <output style={outputStyle}>{value}</output>
            </div>
        </div>
    );
};
