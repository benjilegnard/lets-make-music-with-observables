import { useEffect, useRef } from 'preact/hooks';
import { signal, computed } from '@preact/signals';
import { Observable, Subscription } from 'rxjs';

// SVG styling constants
const MARBLE_STROKE = '#333';
const MARBLE_STROKE_WIDTH = '2';
const LINE_STROKE = '#666';
const LINE_STROKE_WIDTH = '2';
const TEXT_FILL = '#333';
const TEXT_FONT_SIZE = '12';
const MARBLE_TEXT_FILL = '#fff';
const MARBLE_TEXT_FONT_SIZE = '10';

// Layout constants
const MARBLE_RADIUS = 15;
const LINE_HEIGHT = 60;
const ANIMATION_DURATION = 8000; // 8 seconds to cross the screen
// const MARBLE_SPACING = 100; // Minimum spacing between marbles

interface MarbleData {
    id: string;
    value: any;
    color: string;
    startTime: number;
    x: number;
}

interface ObservableInput {
    label: string;
    value: Observable<any>;
}

interface Props {
    observables: ObservableInput[];
}

// Predefined marble colors
const MARBLE_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
];

// Global signals
const marbles = signal<{ [key: string]: MarbleData[] }>({});
const containerWidth = signal(800);
const observableColors = signal<{ [key: string]: string }>({});

export const MarbleDiagram = ({ observables }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const subscriptionsRef = useRef<Subscription[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    const getRandomColor = (index: number): string => {
        return MARBLE_COLORS[index % MARBLE_COLORS.length];
    };

    const updateContainerWidth = () => {
        if (containerRef.current) {
            containerWidth.value = containerRef.current.offsetWidth;
        }
    };

    const cleanup = () => {
        subscriptionsRef.current.forEach(sub => sub.unsubscribe());
        subscriptionsRef.current = [];
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    };

    const setupObservables = () => {
        const newMarbles: { [key: string]: MarbleData[] } = {};
        const newColors = { ...observableColors.value };

        observables.forEach((obs, index) => {
            newMarbles[obs.label] = [];

            // Assign a consistent color for this observable
            if (!newColors[obs.label]) {
                newColors[obs.label] = getRandomColor(index);
            }

            const subscription = obs.value.subscribe({
                next: (value) => {
                    const marble: MarbleData = {
                        id: `${obs.label}-${Date.now()}-${Math.random()}`,
                        value,
                        color: newColors[obs.label],
                        startTime: Date.now(),
                        x: containerWidth.value
                    };

                    marbles.value = {
                        ...marbles.value,
                        [obs.label]: [...(marbles.value[obs.label] || []), marble]
                    };
                },
                error: (err) => console.error(`Error in ${obs.label}:`, err),
                complete: () => console.log(`${obs.label} completed`)
            });

            subscriptionsRef.current.push(subscription);
        });

        observableColors.value = newColors;
        marbles.value = newMarbles;
    };

    const startAnimation = () => {
        const animate = () => {
            const now = Date.now();
            const speed = containerWidth.value / ANIMATION_DURATION; // pixels per ms

            const newMarbles: { [key: string]: MarbleData[] } = {};

            Object.keys(marbles.value).forEach(label => {
                newMarbles[label] = marbles.value[label]
                    .map(marble => ({
                        ...marble,
                        x: marble.x - (now - marble.startTime) * speed
                    }))
                    .filter(marble => marble.x > -MARBLE_RADIUS * 2); // Remove marbles that are off-screen
            });

            marbles.value = newMarbles;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();
    };

    const renderMarble = (marble: MarbleData, y: number) => {
        const displayValue = typeof marble.value === 'object'
            ? JSON.stringify(marble.value)
            : String(marble.value);

        const truncatedValue = displayValue.length > 8
            ? displayValue.substring(0, 8) + '...'
            : displayValue;

        return (
            <g key={marble.id}>
                <circle
                    cx={marble.x}
                    cy={y}
                    r={MARBLE_RADIUS}
                    fill={marble.color}
                    stroke={MARBLE_STROKE}
                    strokeWidth={MARBLE_STROKE_WIDTH}
                />
                <text
                    x={marble.x}
                    y={y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={MARBLE_TEXT_FILL}
                    font-size={MARBLE_TEXT_FONT_SIZE}
                    font-family="monospace"
                    font-weight="bold"
                >
                    {truncatedValue}
                </text>
            </g>
        );
    };

    const renderObservableLine = (observable: ObservableInput, index: number) => {
        const y = 50 + index * LINE_HEIGHT;
        const observableMarbles = marbles.value[observable.label] || [];

        return (
            <g key={observable.label}>
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
                    y={y - 20}
                    fill={TEXT_FILL}
                    fontSize={TEXT_FONT_SIZE}
                    fontFamily="sans-serif"
                    fontWeight="bold"
                >
                    {observable.label}
                </text>

                {/* Arrow at the end of the line */}
                <polygon
                    points={`${containerWidth.value - 10},${y - 5} ${containerWidth.value},${y} ${containerWidth.value - 10},${y + 5}`}
                    fill={LINE_STROKE}
                />

                {/* Marbles */}
                {observableMarbles.map(marble => renderMarble(marble, y))}
            </g>
        );
    };

    // Computed height based on number of observables
    const height = computed(() => Math.max(200, 100 + observables.length * LINE_HEIGHT));

    useEffect(() => {
        setupObservables();
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
        cleanup();
        setupObservables();
    }, [observables]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: `${height.value}px`,
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#f9f9f9',
                position: 'relative'
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${containerWidth.value} ${height.value}`}
                style={{ display: 'block' }}
            >
                {observables.map((obs, index) =>
                    renderObservableLine(obs, index)
                )}
            </svg>

            <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                fontSize: '12px',
                color: '#666',
                fontFamily: 'sans-serif'
            }}>
                Time →
            </div>
        </div>
    );
};

export default MarbleDiagram;
