import { of, interval } from 'rxjs';
import { map } from 'rxjs/operators';

import { MarbleDiagram } from '../components/marble-diagram';

export const ExampleRxJS1 = () => {
    // Sample observables
    const source1 = interval(1000).pipe(map(x => x + 1));
    const source2 = interval(1500).pipe(map(x => x * 10));
    const source3 = of('A', 'B', 'C', 'D', 'E');

    const streams = [
        { label: 'Counter', value: source1 },
        { label: 'Tens', value: source2 },
        { label: 'Letters', value: source3 }
    ];

    return <MarbleDiagram observables={streams} />;
};

