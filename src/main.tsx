import './style.scss';

import 'reveal.js/plugin/highlight/highlight.esm';

import { ComponentChild, render } from 'preact';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown';
import Notes from 'reveal.js/plugin/notes/notes';
import Highlight from 'reveal.js/plugin/highlight/highlight';
import RevealMath from 'reveal.js/plugin/math/math';
import { SoundTest } from './components/sound-test';
import { Storybook } from './components/storybook';
import { Metronome } from './slides/metronome';
import { MarbleDemo } from './slides/marble-demo';
import { BpmToInterval, BpmToIntervalWithTick } from './slides/bpm-to-interval';
import { BpmToTimeSignature } from './slides/bpm-to-time-signature';
import { DrumBeat } from './slides/drum-beat';
import { Theremin } from './slides/theremin';
import { BassLine } from './slides/bass-line';
import { ChordProgression } from './slides/chord-progression';
import { BigFinal } from './slides/big-final';

let deck = new Reveal({
    plugins: [Markdown, Notes, Highlight, RevealMath.KaTeX],
});

const components: Record<string, ComponentChild> = {
    'sound-test': <SoundTest />,
    storybook: <Storybook />,
    metronome: <Metronome />,
    'marble-demo': <MarbleDemo />,
    'bpm-to-interval': <BpmToInterval />,
    'bpm-to-interval-with-tick': <BpmToIntervalWithTick />,
    'bpm-to-time-signature': <BpmToTimeSignature />,
    'drum-beat': <DrumBeat />,
    'theremin': <Theremin />,
    'bass-line': <BassLine />,
    'chord-progression': <ChordProgression />,
    'big-final': <BigFinal />,
};

deck.initialize({
    progress: false,
    controls: true,
    slideNumber: 'c/t',
    showSlideNumber: 'speaker',
    hashOneBasedIndex: true,
    hash: true,
    pause: false,
    transition: 'none',
    backgroundTransition: 'none',
    // disableLayout: true,
    history: false,
    pdfSeparateFragments: false,
    keyboard: { b: null } as unknown as boolean,
}).then(() => {
    // initialize preact components in slides
    Object.keys(components).forEach((id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with id ${id} is missing!`);
            return;
        }
        render(components[id], element);
    });
});
