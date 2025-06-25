import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { MarbleDiagram, DiagramLine, DiagramOperator } from '../components/marble-diagram';
import { Button } from '../components/button';
import { BehaviorSubject, interval, filter, tap, EMPTY, switchMap } from 'rxjs';

const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(console.error);
};

const isPlaying$ = new BehaviorSubject<boolean>(false);

const tick$ = isPlaying$.pipe(
    switchMap(isPlaying => isPlaying ? interval(500) : EMPTY)
);

const bassDrum$ = tick$.pipe(
    filter((tick) => tick % 4 === 0),
    tap(() => playSound('/sounds/TR-808/BD0000.WAV'))
);

const hiHat$ = tick$.pipe(
    filter(() => true),
    tap(() => playSound('/sounds/TR-808/CH.WAV'))
);

const snare$ = tick$.pipe(
    filter((tick) => tick % 4 === 2),
    tap(() => playSound('/sounds/TR-808/SD0000.WAV'))
);

// Subscribe to all drum tracks
bassDrum$.subscribe();
hiHat$.subscribe();
snare$.subscribe();

export const DrumBeat: FunctionComponent = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayback = () => {
        const newState = !isPlaying;
        setIsPlaying(newState);
        isPlaying$.next(newState);
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
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <Button
                    onClick={togglePlayback}
                    variant={isPlaying ? 'danger' : 'success'}
                >
                    {isPlaying ? 'Stop' : 'Start'}
                </Button>
            </div>

            <MarbleDiagram>
                <DiagramLine label={`tick$`} observable={tick$} />

                <DiagramOperator>
                    .filter((tick) =&gt; tick % 4 === 0)
                </DiagramOperator>

                <DiagramLine label={`bassDrum$`} observable={bassDrum$} />

                <DiagramOperator>
                    .filter(() =&gt; true)
                </DiagramOperator>

                <DiagramLine label={`hiHat$`} observable={hiHat$} />

                <DiagramOperator>
                    .filter((tick) =&gt; tick % 4 === 2)
                </DiagramOperator>

                <DiagramLine label={`snare$`} observable={snare$} />
            </MarbleDiagram>
        </div>
    );
};