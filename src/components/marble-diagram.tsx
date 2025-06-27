import { FunctionComponent, ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { signal, useSignal } from '@preact/signals';
import { Observable, Subscription } from 'rxjs';
import { flavors } from '@catppuccin/palette';

// Get the mocha palette
const mocha = flavors.mocha.colors;

// SVG styling constants using Catppuccin colors
const MARBLE_STROKE_WIDTH = '3';
const LINE_STROKE = mocha.overlay0.hex;
const LINE_STROKE_WIDTH = '2';
const TEXT_FILL = mocha.text.hex;
const TEXT_FONT_SIZE = '12';
const MARBLE_TEXT_FONT_SIZE = '10';

// Layout constants
const MARBLE_RADIUS = 20;
const LINE_HEIGHT = 80;
const ANIMATION_DURATION = 8000; // 8 seconds to cross the screen

interface MarbleData {
    id: string;
    value: any;
    color: string;
    startTime: number;
    x: number;
    observableLabel: string;
    startX: number; // Store the starting x position
}

// Predefined marble colors using Catppuccin palette
const MARBLE_COLORS = [
    mocha.red.hex,
    mocha.green.hex,
    mocha.blue.hex,
    mocha.yellow.hex,
    mocha.peach.hex,
    mocha.pink.hex,
    mocha.teal.hex,
    mocha.lavender.hex,
    mocha.mauve.hex,
    mocha.sky.hex,
    mocha.sapphire.hex,
    mocha.maroon.hex,
    mocha.rosewater.hex,
    mocha.flamingo.hex,
];

// Global signals
const observableColors = signal<{ [key: string]: string }>({});

interface DiagramLineProps {
    label: string;
    observable: Observable<unknown>;
}

export const DiagramLine: FunctionComponent<DiagramLineProps> = ({
    label,
    observable,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const subscriptionRef = useRef<Subscription | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const marbles = useSignal<MarbleData[]>([]);
    const animationTick = useSignal(0); // Force re-renders for animation
    const containerWidth = useSignal(800);

    const getRandomColor = (): string => {
        return MARBLE_COLORS[Math.floor(Math.random() * MARBLE_COLORS.length)];
    };

    const updateContainerWidth = () => {
        if (containerRef.current) {
            containerWidth.value = containerRef.current.offsetWidth;
        }
    };

    const cleanup = () => {
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
            subscriptionRef.current = null;
        }
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    };

    const setupObservable = () => {
        // Assign a consistent color for this observable
        if (!observableColors.value[label]) {
            observableColors.value = {
                ...observableColors.value,
                [label]: getRandomColor(),
            };
        }

        let nextId = 0;
        const subscription = observable.subscribe({
            next: (value) => {
                const now = Date.now();

                const startX = containerWidth.value;
                const marble: MarbleData = {
                    id: `${label}-${nextId++}-${Math.random()}`,
                    value,
                    color: observableColors.value[label],
                    startTime: now,
                    x: startX,
                    observableLabel: label,
                    startX: startX,
                };

                // Add new marble to the array
                marbles.value = [...marbles.value, marble];
            },
            error: (err) => console.error(`Error in ${label}:`, err),
            complete: () => console.log(`${label} completed`),
        });

        subscriptionRef.current = subscription;
    };

    const startAnimation = () => {
        const animate = () => {
            const now = Date.now();
            const speed = containerWidth.value / ANIMATION_DURATION; // pixels per ms

            if (marbles.value.length > 0) {
                // Update marble positions and filter out off-screen marbles
                const updatedMarbles = marbles.value
                    .map((marble) => {
                        const elapsedTime = now - marble.startTime;
                        const newX = marble.startX - elapsedTime * speed;
                        return {
                            ...marble,
                            x: newX,
                        };
                    })
                    .filter((marble) => marble.x > -MARBLE_RADIUS * 4); // Remove marbles that are off-screen

                marbles.value = updatedMarbles;
            }

            // Increment animation tick to force re-render
            animationTick.value++;

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();
    };

    const renderMarble = (marble: MarbleData, y: number) => {
        const displayValue =
            typeof marble.value === 'object'
                ? JSON.stringify(marble.value)
                : String(marble.value);

        const truncatedValue =
            displayValue.length > 8
                ? displayValue.substring(0, 8) + '...'
                : displayValue;

        const leftTextOffset = String(marble.value).length * 8;
        return (
            <g key={marble.id}>
                <circle
                    cx={marble.x}
                    cy={y}
                    r={MARBLE_RADIUS}
                    fill={mocha.crust.hex}
                    stroke={marble.color}
                    strokeWidth={MARBLE_STROKE_WIDTH}
                />
                <text
                    x={marble.x - leftTextOffset}
                    y={y + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={marble.color}
                    fontSize={MARBLE_TEXT_FONT_SIZE}
                    fontFamily="monospace"
                    fontWeight="bold"
                >
                    {truncatedValue}
                </text>
            </g>
        );
    };

    const y = 40; // Fixed y position for single line

    // Access signals to ensure re-renders
    const currentMarbles = marbles.value;

    useEffect(() => {
        setupObservable();
        updateContainerWidth();
        startAnimation();

        const handleResize = () => updateContainerWidth();
        window.addEventListener('resize', handleResize);

        return () => {
            cleanup();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
        }
        setupObservable();
    }, [observable, label]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: `${LINE_HEIGHT}px`,
                border: `1px solid ${mocha.surface1.hex}`,
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: mocha.mantle.hex,
                position: 'relative',
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${containerWidth.value} ${LINE_HEIGHT}`}
                style={{ display: 'block' }}
            >
                {/* Observable line */}
                <line
                    x1={0}
                    y1={y}
                    x2={containerWidth.value}
                    y2={y}
                    stroke={LINE_STROKE}
                    strokeWidth={LINE_STROKE_WIDTH}
                />

                {/* Observable label */}
                <text
                    x={10}
                    y={30}
                    fill={TEXT_FILL}
                    fontSize={TEXT_FONT_SIZE}
                    fontFamily="sans-serif"
                    fontWeight="bold"
                >
                    {label}
                </text>

                {/* Arrow at the end of the line */}
                <polygon
                    points={`${containerWidth.value - 10},${y - 5} ${containerWidth.value},${y} ${containerWidth.value - 10},${y + 5}`}
                    fill={LINE_STROKE}
                />

                {/* Marbles */}
                {currentMarbles.map((marble) => renderMarble(marble, y))}
            </svg>
        </div>
    );
};

interface DiagramOperatorProps {
    children: ComponentChildren;
}

export const DiagramOperator: FunctionComponent<DiagramOperatorProps> = ({
    children,
}) => {
    return (
        <div
            style={{
                width: '100%',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: mocha.surface0.hex,
                border: `1px solid ${mocha.surface1.hex}`,
                borderRadius: '8px',
                fontSize: '24px',
                color: mocha.text.hex,
                fontFamily: 'Hack, monospace',
                position: 'relative',
            }}
        >
            <svg
                width="24"
                height="50"
                style={{
                    position: 'absolute',
                    left: '12px',
                    transform: 'rotate(180deg)',
                }}
            >
                <polygon
                    points="12,15 8,20 16,20"
                    fill={mocha.text.hex}
                />
                <line
                    x1="12"
                    y1="20"
                    x2="12"
                    y2="35"
                    stroke={mocha.text.hex}
                    strokeWidth="2"
                />
            </svg>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {children}
            </div>
        </div>
    );
};

interface MarbleDiagramProps {
    children: ComponentChildren;
}

export const MarbleDiagram: FunctionComponent<MarbleDiagramProps> = ({
    children,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
            }}
        >
            {children}
        </div>
    );
};
