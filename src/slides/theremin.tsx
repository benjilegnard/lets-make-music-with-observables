import { FunctionComponent } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { flavors } from '@catppuccin/palette';

const mocha = flavors.mocha.colors;

interface MousePosition {
    x: number;
    y: number;
}

export const Theremin: FunctionComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [frequency, setFrequency] = useState(440);
    const [mousePos, setMousePos] = useState<MousePosition | null>(null);

    const initAudio = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
            gainRef.current = audioContextRef.current.createGain();
            gainRef.current.connect(audioContextRef.current.destination);
            gainRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
        }
    };

    const startSound = () => {
        if (!audioContextRef.current || !gainRef.current) return;

        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }

        oscillatorRef.current = audioContextRef.current.createOscillator();
        oscillatorRef.current.type = 'sine';
        oscillatorRef.current.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
        oscillatorRef.current.connect(gainRef.current);
        oscillatorRef.current.start();

        setIsPlaying(true);
    };

    const stopSound = () => {
        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current = null;
        }
        setIsPlaying(false);
        setMousePos(null);
    };

    const updateSound = (clientX: number, clientY: number) => {
        if (!canvasRef.current || !oscillatorRef.current || !gainRef.current || !audioContextRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        // Calculate relative position within canvas
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Map X to frequency (200Hz to 2000Hz)
        const normalizedX = x / canvas.width;
        const newFrequency = 200 + (normalizedX * 1800);

        // Map Y to volume (inverted - top is loud, bottom is quiet)
        const normalizedY = 1 - (y / canvas.height);
        const volume = Math.max(0, Math.min(1, normalizedY));

        oscillatorRef.current.frequency.setValueAtTime(newFrequency, audioContextRef.current.currentTime);
        gainRef.current.gain.setValueAtTime(volume * 0.3, audioContextRef.current.currentTime);

        setFrequency(Math.round(newFrequency));
        setMousePos({ x, y });
    };

    const handleMouseDown = (e: MouseEvent) => {
        initAudio();
        startSound();
        updateSound(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isPlaying) {
            updateSound(e.clientX, e.clientY);
        }
    };

    const handleMouseUp = () => {
        stopSound();
    };

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = mocha.base.hex;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = mocha.surface1.hex;
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= canvas.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= canvas.height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw mouse position if playing
        if (isPlaying && mousePos) {
            ctx.fillStyle = mocha.blue.hex;
            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y, 10, 0, 2 * Math.PI);
            ctx.fill();

            // Draw crosshairs
            ctx.strokeStyle = mocha.blue.hex;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, mousePos.y);
            ctx.lineTo(canvas.width, mousePos.y);
            ctx.moveTo(mousePos.x, 0);
            ctx.lineTo(mousePos.x, canvas.height);
            ctx.stroke();

            // Draw coordinates
            ctx.fillStyle = mocha.text.hex;
            ctx.font = '12px monospace';
            ctx.fillText(`x: ${Math.round(mousePos.x)}`, mousePos.x + 15, mousePos.y - 15);
            ctx.fillText(`y: ${Math.round(mousePos.y)}`, mousePos.x + 15, mousePos.y - 5);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isPlaying]);

    useEffect(() => {
        drawCanvas();
    }, [isPlaying, mousePos]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '20px',
                backgroundColor: mocha.mantle.hex,
                borderRadius: '8px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'center',
                    color: mocha.text.hex,
                    fontSize: '26px',
                    fontFamily: 'monospace',
                }}
            >
                <span>Frequency: {frequency} Hz</span>
            </div>

            <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                style={{
                    border: `2px solid ${mocha.surface1.hex}`,
                    borderRadius: '8px',
                    cursor: 'crosshair',
                    backgroundColor: mocha.base.hex,
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />

            <div
                style={{
                    color: mocha.subtext0.hex,
                    fontSize: '14px',
                    textAlign: 'center',
                }}
            >
                Click and drag to play • X-axis: Frequency (200-2000 Hz) • Y-axis: Volume (top=loud, bottom=quiet)
            </div>
        </div>
    );
};
