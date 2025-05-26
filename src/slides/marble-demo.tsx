import { of, interval, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { DiagramLine, MarbleDiagram } from '../components/marble-diagram';
import { Button } from '../components/button';

// Sample observables
const source1 = interval(1000).pipe(map((x) => x + 1));
const source2 = interval(1500).pipe(map((x) => x * 10));
const source3 = of('A', 'B', 'C', 'D', 'E').pipe();
const source0 = new Subject<string>();
const streams = [
    { label: 'counter$', value: source1 },
    { label: 'tens$', value: source2 },
    { label: 'letters$', value: source3 },
];

export const MarbleDemo = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Button
                onMouseDown={() => source0.next('')}
                style={{ justifySelf: 'center', alignSelf: 'center' }}
            >
                Next
            </Button>
            <MarbleDiagram>
                <DiagramLine label="click$" observable={source0} />
                {streams.map((stream) => (
                    <DiagramLine
                        label={stream.label}
                        observable={stream.value}
                    />
                ))}
            </MarbleDiagram>
        </div>
    );
};
