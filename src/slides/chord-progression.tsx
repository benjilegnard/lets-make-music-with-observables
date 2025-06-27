import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { MarbleDiagram, DiagramLine, DiagramOperator } from '../components/marble-diagram';
import { Button } from '../components/button';
import { BehaviorSubject, interval, filter, tap, EMPTY, switchMap, map } from 'rxjs';
import * as Tone from 'tone';

const chords = ['Em', 'C', 'G', 'D'] as const;
const chordNotes = {
    Em: ['E4', 'G4', 'B4'],
    C: ['C4', 'E4', 'G4'],
    G: ['G4', 'B4', 'D5'],
    D: ['D4', 'F#4', 'A4']
};

let synth: Tone.PolySynth | null = null;

const initSynth = async () => {
    if (!synth) {
        await Tone.start();
        synth = new Tone.PolySynth({ volume: 0.2 }).toDestination();
    }
};

const playChord = async (chordName: keyof typeof chordNotes) => {
    await initSynth();
    if (synth) {
        synth.triggerAttackRelease(chordNotes[chordName], '1n');
    }
};

const isPlaying$ = new BehaviorSubject<boolean>(false);

const tick$ = isPlaying$.pipe(
    switchMap(isPlaying => isPlaying ? interval(500) : EMPTY)
);

const chordTrigger$ = tick$.pipe(
    filter((tick) => tick % 4 === 0),
    map((tick) => Math.floor(tick / 4) % 4)
);

const chord$ = chordTrigger$.pipe(
    map((chordIndex) => chords[chordIndex]),
    tap((chord) => playChord(chord))
);

chord$.subscribe();

export const ChordProgression: FunctionComponent = () => {
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

                <DiagramLine label={`chordTrigger$`} observable={chordTrigger$} />

                <DiagramOperator>
                    .map((tick) =&gt; chords[Math.floor(tick / 4) % 4])
                </DiagramOperator>

                <DiagramLine label={`chord$`} observable={chord$} />
            </MarbleDiagram>
        </div>
    );
};
