import { FunctionComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { interval, BehaviorSubject, switchMap, EMPTY } from 'rxjs';
import { Button } from '../components/button';
import { MarbleDiagram, DiagramLine } from '../components/marble-diagram';

export const Metronome: FunctionComponent = () => {
    const isPlaying = useSignal(new BehaviorSubject<boolean>(false));
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);

    // Load the metronome sound
    useEffect(() => {
        const loadSound = async () => {
            try {
                audioContextRef.current = new AudioContext();
                const response = await fetch('sounds/metronome.mp3');
                const arrayBuffer = await response.arrayBuffer();
                audioBufferRef.current =
                    await audioContextRef.current.decodeAudioData(arrayBuffer);
            } catch (error) {
                console.error('Failed to load metronome sound:', error);
            }
        };

        loadSound();

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playSound = () => {
        if (audioContextRef.current && audioBufferRef.current) {
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBufferRef.current;
            source.connect(audioContextRef.current.destination);
            source.start();
        }
    };

    // Create interval observable that depends on isPlaying
    const metronome$ = isPlaying.value.pipe(
        switchMap(
            (playing) => (playing ? interval(500) : EMPTY), // 120 BPM (500ms intervals)
        ),
    );

    const handleStart = () => {
        if (audioContextRef.current?.state === 'suspended') {
            audioContextRef.current.resume();
        }
        isPlaying.value.next(true);
    };

    const handleStop = () => {
        isPlaying.value.next(false);
    };

    // Subscribe to the observable and play sound
    useEffect(() => {
        const subscription = metronome$.subscribe({
            next: (tick) => {
                console.log('Metronome tick:', tick);
                playSound();
            },
            error: (err) => console.error('Metronome error:', err),
            complete: () => console.log('Metronome completed'),
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '20px',
                width: '100%',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button variant="success" onClick={handleStart}>
                    Start
                </Button>
                <Button variant="danger" onClick={handleStop}>
                    Stop
                </Button>
            </div>

            <MarbleDiagram>
                <DiagramLine label="metronome$" observable={metronome$} />
            </MarbleDiagram>
        </div>
    );
};
