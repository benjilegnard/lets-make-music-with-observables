import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Button } from './button';
import { Slider } from './slider';

export const Storybook: FunctionComponent = () => {
    const [sliderValue, setSliderValue] = useState(50);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '20px',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
            </div>

            <Slider
                label="Volume"
                min={0}
                max={100}
                step={1}
                value={sliderValue}
                onChange={setSliderValue}
            />
        </div>
    );
};
