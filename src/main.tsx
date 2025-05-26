import "./style.scss";

import "reveal.js/plugin/highlight/highlight.esm";

import { ComponentChild, render } from "preact";
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown";
import Notes from "reveal.js/plugin/notes/notes";
import Highlight from "reveal.js/plugin/highlight/highlight";
import RevealMath from "reveal.js/plugin/math/math";
import { SoundTest } from "./components/sound-test";
import { Storybook } from "./components/storybook";
import { ExampleRxJS1 } from "./slides/example-rxjs-1";

let deck = new Reveal({
    plugins: [Markdown, Notes, Highlight, RevealMath.KaTeX],
});


const components: Record<string, ComponentChild> = {
    "sound-test": <SoundTest />,
    "storybook": <Storybook />,
    "example-rxjs-1": <ExampleRxJS1 />,
};

deck
    .initialize({
        progress: false,
        controls: false,
        slideNumber: "c/t",
        showSlideNumber: "speaker",
        hashOneBasedIndex: true,
        hash: true,
        pause: false,
        transition: "none",
        backgroundTransition: "none",
        // disableLayout: true,
        history: false,
        pdfSeparateFragments: false,
        keyboard: { b: null } as unknown as boolean,
    })
    .then(() => {
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

