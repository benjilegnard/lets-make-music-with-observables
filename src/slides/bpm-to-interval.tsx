import { FunctionComponent } from 'preact';
import { Slider } from '../components/slider';
import {
    MarbleDiagram,
    DiagramLine,
    DiagramOperator,
} from '../components/marble-diagram';
import { BehaviorSubject, interval, map, switchMap } from 'rxjs';
import { useState } from 'preact/hooks';

const bpmToInterval = (bpm: number): number => {
    return Math.round(60000 / bpm);
};

const bpmValue$ = new BehaviorSubject<number>(120);

const interval$ = bpmValue$.pipe(map((value) => bpmToInterval(value)));

const tick$ = interval$.pipe(switchMap((value) => interval(value)));

interface BpmToIntervalProps {
    withTick?: boolean;
}

export const BpmToInterval: FunctionComponent<BpmToIntervalProps> = (props) => {
    const [bpm, setBpm] = useState(80);
    const nexttBpm = (value: number) => {
        bpmValue$.next(value);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '20px',
            }}
        >
            <Slider
                label="BPM"
                min={40}
                max={180}
                step={1}
                value={bpm}
                onChange={(value) => {
                    setBpm(value);
                    nexttBpm(value);
                }}
            />

            <MarbleDiagram>
                <DiagramLine label={`bpm$ (bpm)`} observable={bpmValue$} />

                <DiagramOperator>.map(bpmToInterval)</DiagramOperator>

                <DiagramLine label={`interval$ (ms)`} observable={interval$} />

                {props.withTick ? (
                    <>
                        <DiagramOperator>
                            .switchMap((valueMs) =&gt; metronome(valueMs))
                        </DiagramOperator>

                        <DiagramLine label={`tick$`} observable={tick$} />
                    </>
                ) : null}
            </MarbleDiagram>
        </div>
    );
};

export const BpmToIntervalWithTick: FunctionComponent = () => (
    <BpmToInterval withTick={true} />
);
