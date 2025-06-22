import { FunctionComponent } from 'preact';
import { Button } from './button';

export const Storybook: FunctionComponent = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                padding: '20px',
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
    );
};
