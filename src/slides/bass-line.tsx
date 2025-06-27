import { FunctionComponent } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { MarbleDiagram, DiagramLine, DiagramOperator } from '../components/marble-diagram';
import { Button } from '../components/button';
import { BehaviorSubject, interval, filter, tap, EMPTY, switchMap, map } from 'rxjs';
import { Note } from 'tonal';

let audioContext: AudioContext | null = null;

const playBassNote = (frequency: number) => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'triangle';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.8);
};

const bassNotes = ['E2', 'C2', 'G2', 'D2'];

const isPlaying$ = new BehaviorSubject<boolean>(false);

const tick$ = isPlaying$.pipe(
    switchMap(isPlaying => isPlaying ? interval(500) : EMPTY)
);

const bassLine$ = tick$.pipe(
    map((tick) => {
        const noteIndex = Math.floor(tick / 4) % bassNotes.length;
        const noteName = bassNotes[noteIndex];
        const frequency = Note.freq(noteName) || 82.41; // E2 fallback
        return { noteName, frequency };
    }),
    tap(({ frequency }) => playBassNote(frequency))
);

bassLine$.subscribe();

export const BassLine: FunctionComponent = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        audioContext = new AudioContext();
        return () => {
            if (audioContext) {
                audioContext.close();
                audioContext = null;
            }
        };
    }, []);

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
                    .map(tick =&gt; bassNotes[Math.floor(tick / 4) % 4])
                </DiagramOperator>

                <DiagramLine
                    label={`bassLine$`}
                    observable={bassLine$.pipe(map((value) => value.noteName))}
                />
            </MarbleDiagram>
        </div>
    );
};
