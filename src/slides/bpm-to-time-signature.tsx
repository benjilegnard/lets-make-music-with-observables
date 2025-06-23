import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Slider } from '../components/slider';
import { Select } from '../components/select';
import { MarbleDiagram, DiagramLine, DiagramOperator } from '../components/marble-diagram';
import { BehaviorSubject, interval, map, switchMap } from 'rxjs';


const bpmToInterval = (bpm: number): number => {
    return Math.round(60000 / bpm);
};

const timeSignatures = {
    '4/4': 4,
    '3/4': 3,
    '2/4': 2,
    '6/8': 6,
    '5/4': 5,
};

const bpmValue$ = new BehaviorSubject<number>(120);

const timeSignature$ = new BehaviorSubject<keyof typeof timeSignatures>('4/4');

const interval$ = bpmValue$.pipe(map((value) => bpmToInterval(value)));

const tick$ = interval$.pipe(switchMap((value) => interval(value)));

const beat$ = tick$.pipe(
    switchMap((tick) =>
        timeSignature$.pipe(
            map(signature =>
                (tick % timeSignatures[signature]) + 1)
        )
    )
);

beat$.subscribe();

export const BpmToTimeSignature: FunctionComponent = () => {
    const [bpm, setBpm] = useState(120);
    const [timeSignature, setTimeSignature] = useState<keyof typeof timeSignatures>('4/4');

    const updateBpm = (value: number) => {
        setBpm(value);
        bpmValue$.next(value);
    };

    const updateTimeSignature = (signature: keyof typeof timeSignatures) => {
        setTimeSignature(signature);
        timeSignature$.next(signature);
    };

    const timeSignatureOptions = Object.keys(timeSignatures).map(sig => ({
        value: sig,
        label: sig
    }));

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '20px',
            }}
        >
            <div style={{ display: 'flex', gap: '24px', alignItems: 'end' }}>
                <Slider
                    label="BPM"
                    min={40}
                    max={180}
                    step={1}
                    value={bpm}
                    onChange={updateBpm}
                />

                <Select
                    label="Time Signature"
                    value={timeSignature}
                    options={timeSignatureOptions}
                    onChange={(value) => updateTimeSignature(value as keyof typeof timeSignatures)}
                />
            </div>

            <MarbleDiagram>
                <DiagramLine label={`tick$`} observable={tick$} />

                <DiagramOperator>
                    .map((tick) =&gt; (tick % {timeSignatures[timeSignature]}) + 1)
                </DiagramOperator>

                <DiagramLine label={`beat$ (${timeSignature})`} observable={beat$} />
            </MarbleDiagram>
        </div>
    );
};
