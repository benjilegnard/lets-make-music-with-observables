import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { MarbleDiagram, DiagramLine } from '../components/marble-diagram';
import { Button } from '../components/button';
import { BehaviorSubject, interval, filter, tap, EMPTY, switchMap, map } from 'rxjs';
import { Note } from 'tonal';
import * as Tone from 'tone';
import { drumSamples } from '../utils';

// Audio contexts and instruments
let synth: Tone.PolySynth | null = null;

// Bass line setup
const playBassNote = (frequency: number) => {
    // Simple bass note playback without visualization
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.8);
};

const bassNotes = ['E2', 'C2', 'G2', 'D2'];

// Drum sounds
const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.3;
    audio.play().catch(console.error);
};

// Chord progression setup
const chords = ['Em', 'C', 'G', 'D'] as const;
const chordNotes = {
    Em: ['E4', 'G4', 'B4'],
    C: ['C4', 'E4', 'G4'],
    G: ['G4', 'B4', 'D5'],
    D: ['D4', 'F#4', 'A4']
};

const initSynth = async () => {
    if (!synth) {
        await Tone.start();
        synth = new Tone.PolySynth({ volume: 0.2 }).toDestination();
        synth.volume.value = -12; // Quieter chords
    }
};

const playChord = async (chordName: keyof typeof chordNotes) => {
    await initSynth();
    if (synth) {
        synth.triggerAttackRelease(chordNotes[chordName], '1n');
    }
};

// Main observables
const isPlaying$ = new BehaviorSubject<boolean>(false);

const tick$ = isPlaying$.pipe(
    switchMap(isPlaying => isPlaying ? interval(500) : EMPTY)
);

// Drum tracks
const bassDrum$ = tick$.pipe(
    filter((tick) => tick % 4 === 0),
    tap(() => playSound(drumSamples.bassDrum))
);

const hiHat$ = tick$.pipe(
    filter(() => true),
    tap(() => playSound(drumSamples.hiHat))
);

const snare$ = tick$.pipe(
    filter((tick) => tick % 4 === 2),
    tap(() => playSound(drumSamples.snare))
);

// Bass line
const bassLine$ = tick$.pipe(
    map((tick) => {
        const noteIndex = Math.floor(tick / 4) % bassNotes.length;
        const noteName = bassNotes[noteIndex];
        const frequency = Note.freq(noteName) || 82.41;
        return { noteName, frequency };
    }),
    tap(({ frequency }) => playBassNote(frequency))
);

// Chord progression
const chord$ = tick$.pipe(
    filter((tick) => tick % 4 === 0),
    map((tick) => {
        const chordIndex = Math.floor(tick / 4) % chords.length;
        return chords[chordIndex];
    }),
    tap((chord) => playChord(chord))
);

// Subscribe to all tracks
bassDrum$.subscribe();
hiHat$.subscribe();
snare$.subscribe();
bassLine$.subscribe();
chord$.subscribe();

export const BigFinal: FunctionComponent = () => {
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
                {/*
                <DiagramOperator>
                    Drums: bassDrum$ (tick % 4 === 0), hiHat$ (all), snare$ (tick % 4 === 2)
                </DiagramOperator>

*/}
                <DiagramLine label={`bassDrum$`} observable={bassDrum$} />
                <DiagramLine label={`hiHat$`} observable={hiHat$} />
                <DiagramLine label={`snare$`} observable={snare$} />
                {/*
                <DiagramOperator>
                    .map(tick =&gt; bassNotes[Math.floor(tick / 4) % 4])
                </DiagramOperator>

*/}
                <DiagramLine
                    label={`bassLine$`}
                    observable={bassLine$.pipe(map((value) => value.noteName))}
                />
                {/*
                <DiagramOperator>
                    .map(tick =&gt; chords[Math.floor(tick / 4) % 4])
                </DiagramOperator>
*/}
                <DiagramLine label={`chord$`} observable={chord$} />
            </MarbleDiagram>
        </div>
    );
};
